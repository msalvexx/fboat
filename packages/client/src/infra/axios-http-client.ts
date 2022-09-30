import { HttpRequest, HttpResponse, HttpClient, HttpContentType } from '@/client/domain/protocols'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient<R = any> implements HttpClient<R> {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: this.getBody(data),
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  private getBody (data: HttpRequest): any {
    if (data.headers?.['Content-Type'] !== HttpContentType.formData) return data.body
    const formData = new FormData()
    for (const propertyName in data.body) {
      formData.append(propertyName, data.body[propertyName])
    }
    return formData
  }
}
