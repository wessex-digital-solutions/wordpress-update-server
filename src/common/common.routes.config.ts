import express from 'express';

export abstract class CommonRoutesConfig {
  app: express.Application;

  name: string;

  version: string;

  base: string;

  constructor(
    app: express.Application,
    name: string,
    version: string,
    base?: string
  ) {
    this.app = app;
    this.name = name;
    this.version = version;
    this.base = base || '';
    this.configureRoutes();
  }

  getName(): string {
    return this.name;
  }

  getVersion(): string {
    return this.version;
  }

  getBase(): string {
    return this.base;
  }

  abstract configureRoutes(): express.Application;
}
