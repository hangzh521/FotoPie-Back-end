import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi } from "openai";

@Injectable({})
export class CreateImageService {
  private openai: OpenAIApi;

  // Connect with OpenAI with the API Key
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY as string,
    });

    this.openai = new OpenAIApi(configuration);
  }

  // Create new image
  async createNewImage(prompt: string): Promise<object> {
    try {
      const response = await this.openai.createImage({
        prompt: `${prompt}`,
        n: 4,
        size: "1024x1024",
        response_format: "url",
      });
      // Return 4 urls in an object
      const urls = {
        url_1: response.data.data[0].url,
        url_2: response.data.data[1].url,
        url_3: response.data.data[2].url,
        url_4: response.data.data[3].url,
      };
      return urls;
    } catch (error) {
      return { message: "Image Generation Failed" };
    }
  }
}