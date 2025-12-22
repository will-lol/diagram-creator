#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "requests",
# ]
# ///

import os
import sys
import base64
import requests
import json

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def main():
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print("Error: OPENROUTER_API_KEY environment variable not set.")
        sys.exit(1)

    if len(sys.argv) < 2:
        print("Usage: python vision.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]
    if not os.path.exists(image_path):
        print(f"Error: File '{image_path}' not found.")
        sys.exit(1)

    try:
        base64_image = encode_image(image_path)
    except Exception as e:
        print(f"Error reading image: {e}")
        sys.exit(1)

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/opencode",  # Optional, for OpenRouter rankings
        "X-Title": "Vision Script",  # Optional
    }

    # model: google/gemini-flash-1.5 is the typical ID for Gemini 1.5 Flash on OpenRouter
    payload = {
        "model": "google/gemini-3-flash-preview",
        "include_reasoning": False,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this diagram technically."},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                    },
                ],
            }
        ],
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            data=json.dumps(payload),
        )
        response.raise_for_status()

        result = response.json()
        if "choices" in result and len(result["choices"]) > 0:
            print(result["choices"][0]["message"]["content"])
        else:
            print("No content received from API.")
            print(json.dumps(result, indent=2))

    except requests.exceptions.RequestException as e:
        print(f"API Request failed: {e}")
        if hasattr(e, "response") and e.response is not None:
            print(e.response.text)

if __name__ == "__main__":
    main()
