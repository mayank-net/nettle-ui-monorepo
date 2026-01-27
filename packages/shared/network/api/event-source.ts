import { TEventData, TEventStreamData } from "shared/types";
import { getHeaders } from "../utils/headers";
import { compressPayloadForQueryString } from "../utils";

type EventCallback = (data: TEventStreamData) => void;

interface CustomEventSourceOptions {
  headers?: Record<string, string>;
  payload?: Record<string, string>;
}

export class CustomEventSource {
  private xhr: XMLHttpRequest;
  private eventListeners: Record<string, EventCallback>;
  private url: string;
  private options: CustomEventSourceOptions;
  private reconnectAttempts: number;
  private maxReconnectAttempts: number;
  private reconnectDelay: number;

  constructor(url: string, options: CustomEventSourceOptions = {}) {
    this.url = url;
    if (options.payload) {
      const encodedPayload = compressPayloadForQueryString(options.payload);
      this.url = `${url}?data=${encodedPayload}`;
    }
    this.options = {
      ...options,
      headers: { ...getHeaders({}), ...options.headers },
    };
    this.xhr = new XMLHttpRequest();
    this.eventListeners = {};
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5; // Maximum retries before stopping
    this.reconnectDelay = 1000; // Initial delay (1 sec), doubles each retry

    this.init();
  }

  private extractEventAndData(eventText: string): TEventStreamData | null {
    try {
      if (eventText) {
        const parts = eventText.trim().split("\ndata:{");
        const data = JSON.parse("{" + parts[1]) as TEventData;
        const type = parts[0].split("event:")[1].trim();
        return {
          type,
          data,
        };
      }
    } catch (err) {
      console.log("ERROR::EVENT PARSING FAILED", err);
    }
    return null;
  }

  private init() {
    this.xhr.open("GET", this.url);

    // Set custom headers if provided
    if (this.options.headers) {
      Object.keys(this.options.headers).forEach((key) => {
        this.xhr.setRequestHeader(key, this.options.headers![key]);
      });
    }

    // Handle incoming data
    this.xhr.onprogress = this.handleProgress.bind(this);

    // Handle connection close
    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState === XMLHttpRequest.DONE) {
        if (this.xhr.status === 200) {
          this.reconnect();
        } else {
          console.error("Connection error, status:", this.xhr.status);
        }
      }
    };

    this.xhr.send();
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts); // Exponential backoff
      setTimeout(() => {
        this.reconnectAttempts++;
        this.init();
      }, delay);
    }
  }

  private handleProgress() {
    // Split the response into individual events
    const events = this.xhr.responseText.split("\n\n");
    events.forEach((eventText) => {
      const event = this.parseSSEEvent(eventText);
      if (event && this.eventListeners[event.type]) {
        this.eventListeners[event.type](event);
      }
    });
  }

  private parseSSEEvent(eventText: string): TEventStreamData | null {
    const eventData = this.extractEventAndData(eventText);

    if (eventData && eventData?.type && eventData?.data) {
      return eventData;
    }
    return null;
  }

  // Register event listeners
  public on(eventType: string, callback: EventCallback): void {
    this.eventListeners[eventType] = callback;
  }

  // Close the connection
  public close(): void {
    this.xhr.abort();
  }
}
