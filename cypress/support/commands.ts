import { getBySel } from './commands/getBySel';
require('@cypress/snapshot').register();
Cypress.Commands.add('getBySel', getBySel);
