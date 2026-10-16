export type DocFieldDefinition = {
  readonly fieldname: string;
  readonly fieldtype: "Data";
  readonly label: string;
  readonly reqd: boolean;
  readonly read_only: boolean;
  readonly unique: boolean;
};

export type DocTypeDefinition = {
  readonly name: string;
  readonly module: string;
  readonly fields: readonly DocFieldDefinition[];
};
