export enum MySQLRole {
  Writer = 'escritor',
  FBoatReader = 'leitor-veleiro',
  FBoatController = 'controlador-veleiro',
  Administrator = 'administrador'
}

export namespace MySQLRole {
  export function getKeyByValue (value: string): string {
    const indexOfS = Object.values(MySQLRole).indexOf(value as unknown as MySQLRole)
    return Object.keys(MySQLRole)[indexOfS]
  }

  export function getValueByKey (key: string): string {
    return MySQLRole[key as unknown as keyof typeof MySQLRole].toString()
  }
}
