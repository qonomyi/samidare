import axios from "axios";
import { getConfig } from "./config.js";
import { filesize } from "filesize";

type DiscordEmbed = {
  title?: string;
  description?: string;
  color?: number;
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  footer?: {
    text: string;
    icon_url?: string;
  };
  timestamp?: string;
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
};

type BaseLogArgs = {
  content?: string;
  username?: string;
  avatar_url?: number;
  embeds?: DiscordEmbed[];
};

export function baseLog(data: BaseLogArgs) {
  const headers = {
    "Content-Type": "application/json",
  };

  const body = {
    content: data.content,
    username: data.username,
    avatar_url: data.avatar_url,
    embeds: data.embeds,
  };

  const config = getConfig();
  axios.post(config.logging.webhookUrl, body, { headers: headers });
}

type UploadLogArgs = {
  id: string;
  dest: string;
  originalName: string;
  sizeBytes: number;
  mimeType: string | undefined;
};

export function uploadLog(data: UploadLogArgs) {
  const config = getConfig();
  baseLog({
    embeds: [
      {
        title: "New Upload (｡>﹏<｡)",
        description: `${config.public.host}/${data.id}`,
        color: 0x646687,
        fields: [
          {
            name: "Size",
            value: filesize(data.sizeBytes),
            inline: true,
          },
          {
            name: "Original Name",
            value: data.originalName,
            inline: true,
          },
          {
            name: "MIME Type",
            value: data.mimeType ?? "null",
            inline: true,
          },
          {
            name: "Raw Link",
            value: `${config.public.host}/api/raw/${data.dest}`,
            inline: false,
          },
        ],
      },
    ],
  });
}
