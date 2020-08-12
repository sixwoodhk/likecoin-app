import RemoteConfigModule, { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config'
import {
  APP_RATING_COOLDOWN,
  APP_RATING_MIN_VERSION,
  APP_VERSION,
  AUTHCORE_CREDENTIAL_KEY,
  AUTHCORE_ROOT_URL,
  BIG_DIPPER_URL,
  COSMOS_CHAIN_ID,
  COSMOS_LCD_URL,
  COSMOS_DENOM,
  COSMOS_FRACTION_DENOM,
  COSMOS_FRACTION_DIGITS,
  COSMOS_GAS_PRICE,
  CRISP_WEBSITE_ID,
  IAP_ENABLE,
  IAP_IOS_IS_SANDBOX,
  IAP_IOS_SHARED_SECRET,
  APP_REFERRAL_ENABLE,
  LIKECO_API_URL,
  LIKERLAND_API_URL,
  LIKERLAND_SIGNIN_RETRY_COUNT,
  LIKECOIN_BUTTON_BASE_URL,
  MIN_VERSION,
  SENTRY_DSN,
  SIGNIN_SCREEN_BGIMAGE_URL,
  STATISTICS_OLDEST_DATE,
  USER_PII_SALT,
  MAX_GLOBAL_SUPERLIKE_FEED_ITEM,
  MAX_FOLLOWING_SUPERLIKE_PAGE,
  READING_FEED_RESUME_REFRESH_DEBOUNCE,
} from "react-native-dotenv"
import FastImage from 'react-native-fast-image'

export interface AppConfigParams {
  APP_RATING_COOLDOWN: string
  APP_RATING_MIN_VERSION: string
  APP_VERSION: string
  AUTHCORE_CREDENTIAL_KEY: string
  AUTHCORE_ROOT_URL: string
  BIG_DIPPER_URL: string
  COSMOS_CHAIN_ID: string
  COSMOS_LCD_URL: string
  COSMOS_DENOM: string
  COSMOS_FRACTION_DENOM: string
  COSMOS_FRACTION_DIGITS: string
  COSMOS_GAS_PRICE: string
  CRISP_WEBSITE_ID: string
  IAP_ENABLE: string
  IAP_IOS_IS_SANDBOX: string
  IAP_IOS_SHARED_SECRET: string
  APP_REFERRAL_ENABLE: string
  LIKECO_API_URL: string
  LIKERLAND_API_URL: string
  LIKERLAND_SIGNIN_RETRY_COUNT: string
  LIKECOIN_BUTTON_BASE_URL: string
  MIN_VERSION: string
  SENTRY_DSN: string
  SIGNIN_SCREEN_BGIMAGE_URL: string
  STATISTICS_OLDEST_DATE: string
  USER_PII_SALT: string
  MAX_GLOBAL_SUPERLIKE_FEED_ITEM: string
  MAX_FOLLOWING_SUPERLIKE_PAGE: string
  READING_FEED_RESUME_REFRESH_DEBOUNCE: string
}

export type AppConfigParamKey = keyof AppConfigParams

export class AppConfig {
  /**
   * The config object
   */
  private config: AppConfigParams

  /**
   * The Firebase Remote Config module
   */
  private remoteConfig: FirebaseRemoteConfigTypes.Module

  constructor() {
    this.config = {
      APP_VERSION,
      APP_RATING_MIN_VERSION,
      APP_RATING_COOLDOWN,
      AUTHCORE_CREDENTIAL_KEY,
      AUTHCORE_ROOT_URL,
      BIG_DIPPER_URL,
      COSMOS_CHAIN_ID,
      COSMOS_DENOM,
      COSMOS_FRACTION_DENOM,
      COSMOS_FRACTION_DIGITS,
      COSMOS_GAS_PRICE,
      COSMOS_LCD_URL,
      CRISP_WEBSITE_ID,
      IAP_ENABLE,
      IAP_IOS_IS_SANDBOX,
      IAP_IOS_SHARED_SECRET,
      APP_REFERRAL_ENABLE,
      LIKECO_API_URL,
      LIKERLAND_API_URL,
      LIKERLAND_SIGNIN_RETRY_COUNT,
      LIKECOIN_BUTTON_BASE_URL,
      MIN_VERSION,
      SENTRY_DSN,
      SIGNIN_SCREEN_BGIMAGE_URL,
      STATISTICS_OLDEST_DATE,
      USER_PII_SALT,
      MAX_GLOBAL_SUPERLIKE_FEED_ITEM,
      MAX_FOLLOWING_SUPERLIKE_PAGE,
      READING_FEED_RESUME_REFRESH_DEBOUNCE,
    }
    this.remoteConfig = RemoteConfigModule()
  }

  async setup() {
    try {
      await this.remoteConfig.setConfigSettings({
        isDeveloperModeEnabled: __DEV__,
      })
      await this.remoteConfig.fetch()
      await this.remoteConfig.activate()
      const { value: newConfigJSONString } = this.remoteConfig.getValue('api_config')
      let remoteConfig = {}
      try {
        remoteConfig = JSON.parse(newConfigJSONString as string)
      } catch (err) {
        console.error(err)
      }
      this.config = {
        ...this.config,
        ...remoteConfig,
      }

      if (this.getValue("SIGNIN_SCREEN_BGIMAGE_URL")) {
        FastImage.preload([
          {
            uri: this.getValue("SIGNIN_SCREEN_BGIMAGE_URL"),
            priority: FastImage.priority.low,
          }
        ])
      }
    } catch (err) {
      console.error(err)
    }
  }

  getAllParams() {
    return this.config
  }

  getValue(key: AppConfigParamKey) {
    return this.config[key]
  }

  getNumericValue(key: AppConfigParamKey, defaultValue?: number) {
    return parseInt(this.getValue(key)) || defaultValue
  }

  getIsDeprecatedAppVersion() {
    return this.getNumericValue("MIN_VERSION") > this.getNumericValue(APP_VERSION)
  }
}
