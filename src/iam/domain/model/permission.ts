export type OwnerPermission = 'ChangeAccount' | 'ChangePassword' | 'DeleteAccount'
export type WriterPermission = 'CreateArticle' | 'ChangeArticle' | 'PublishArticle' | 'DeleteArticle'
export type FBoatReaderPermission = 'ReadFBoatData'
export type FBoatControllerPermission = 'ControlFBoat'
export type AdminPermission = 'ChangeRole' | OwnerPermission | WriterPermission | FBoatControllerPermission | FBoatReaderPermission
export type Permission = OwnerPermission | AdminPermission | WriterPermission | FBoatControllerPermission | FBoatReaderPermission
