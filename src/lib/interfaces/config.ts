export interface Config {
  allowAction: () => boolean | boolean;
  allowDelete: () => boolean | boolean;
  allowCreate: () => boolean | boolean;
}