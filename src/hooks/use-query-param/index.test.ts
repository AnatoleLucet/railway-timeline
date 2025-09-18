import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useQueryParam } from ".";

describe("useQueryParam", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("should get and set query parameters correctly", () => {
    const result = renderHook(() => useQueryParam("test", "default"));
    const [value, setValue] = result.result.current;

    expect(value).toBe("default");

    act(() => setValue("newValue"));
    expect(window.location.search).toBe("?test=newValue");

    const result2 = renderHook(() => useQueryParam("test", "default"));
    const [value2] = result2.result.current;
    expect(value2).toBe("newValue");
  });

  it("should handle empty string as removal of query parameter", () => {
    const result = renderHook(() => useQueryParam("test", "default"));
    const [, setValue] = result.result.current;

    act(() => setValue("newValue"));
    expect(window.location.search).toBe("?test=newValue");

    act(() => setValue(""));
    expect(window.location.search).toBe("");
  });

  it("should handle multiple query parameters", () => {
    window.history.replaceState({}, "", "/?foo=bar");

    const result = renderHook(() => useQueryParam("test", "default"));
    const [, setValue] = result.result.current;

    act(() => setValue("newValue"));
    expect(window.location.search).toBe("?foo=bar&test=newValue");

    const result2 = renderHook(() => useQueryParam("foo", "defaultFoo"));
    const [value2] = result2.result.current;
    expect(value2).toBe("bar");
  });
});
