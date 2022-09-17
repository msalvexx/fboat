import { FileUploadController } from '@/server/shared/controllers/file-upload'

import { ControllerSpy } from '@/tests/mocks/shared'

describe('File Upload Controller', () => {
  let sut: FileUploadController
  let spy: ControllerSpy

  beforeEach(() => {
    sut = new FileUploadController()
    spy = new ControllerSpy()
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
