export type OwnerPermission = 'ChangeAccount' | 'ChangeOwnPassword' | 'DeleteAccount'
export type WriterPermission = 'CreateArticle' | 'ChangeArticle' | 'PublishArticle' | 'DeleteArticle'
export type FBoatReaderPermission = 'ReadFBoatData'
export type FBoatControllerPermission = 'ControlFBoat'
export type AdminPermission = 'ChangeRole' | 'CreateAccount' | 'ChangeEveryonesPassword' | OwnerPermission | WriterPermission | FBoatControllerPermission | FBoatReaderPermission
export type Permission = OwnerPermission | AdminPermission | WriterPermission | FBoatControllerPermission | FBoatReaderPermission
