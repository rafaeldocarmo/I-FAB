import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ke5xx09s',
    dataset: 'production'
  },
  deployment: {
    /**
     * Target the existing deployed studio (ifab.sanity.studio) explicitly, so
     * `sanity deploy` never prompts for an application id and cannot create a
     * second studio by accident.
     */
    appId: 'yit4jw0x8v6hmny1419ggq8l',
    /**
     * Enable auto-updates for studios.
     *
     * Note this updates the Sanity packages only — schema changes still need a
     * `npm run deploy` from this folder to reach the hosted studio.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
