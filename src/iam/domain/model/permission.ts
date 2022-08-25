export type WriterPermission = 'CreateArticle' | 'ChangeArticle' | 'PublishArticle' | 'DeleteArticle'
export type FBoatReaderPermission = 'ReadFBoatData'
export type FBoatControllerPermission = 'ControlFBoat'
export type AdminPermission = 'ListAccounts' | 'GetAccount' | 'DeleteAccount' | 'ChangeRole' | 'CreateAccount' | 'ChangePassword' | 'ChangeAccount' | WriterPermission | FBoatControllerPermission | FBoatReaderPermission
export type Permission = AdminPermission | WriterPermission | FBoatControllerPermission | FBoatReaderPermission
