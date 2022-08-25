import { FileUploadHandler } from '@/shared/handlers/file-upload'

import { HandlerSpy } from '@/tests/mocks/shared'

describe('File Upload Handler', () => {
  let sut: FileUploadHandler
  let spy: HandlerSpy

  beforeEach(() => {
    sut = new FileUploadHandler()
    spy = new HandlerSpy()
    sut.setNext(spy)
  })

  test('Should map file to SaveAttachment.Params if is present', async () => {
    const file = Buffer.from('any')

    await sut.handle({
      file: {
        data: file,
        mimetype: 'image/png'
      }
    })

    expect(spy.params).toStrictEqual({
      file,
      extension: 'png'
    })
  })

  test('Should not change payload if file is not present', async () => {
    await sut.handle({})

    expect(spy.params).toStrictEqual({})
  })
})
