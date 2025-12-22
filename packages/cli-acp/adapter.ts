// Adapter logic to translate between Stdio and Core
export class ACPAdapter {
  constructor() {}
}

const messages: ModelMessage[] = [
  {
    role: "user",
    content: input.map((contentBlock): TextPart | ImagePart | FilePart => {
      switch (contentBlock.type) {
        case "text":
          return {
            type: "text",
            text: contentBlock.text,
          };
        case "image":
          return {
            type: "image",
            image: `data:${contentBlock.mimeType};base64,${contentBlock.data}`,
          };
        case "resource_link":
          return {
            type: "file",
            filename: contentBlock.name,
            mediaType: contentBlock.mimeType ?? "text/plain",
            data: new URL(contentBlock.uri),
          };
        case "resource":
          const url = new URL(contentBlock.resource.uri);
          const filename = url.pathname.split("/").pop() ?? "";
          const mimeType = contentBlock.resource.mimeType ?? "text/plain";
          let data: string | undefined;

          if ("blob" in contentBlock.resource) {
            data = contentBlock.resource.blob;
            return {
              type: "file",
              filename: filename,
              mediaType: mimeType,
              data: `data:${mimeType};base64,${data}`,
            };
          } else {
            data = contentBlock.resource.text;
            return {
              type: "text",
              text: `Here is the contents of ${filename}: \n\`\`\`\n${data}\n\`\`\``,
            };
          }
      }
    }),
  },
];
