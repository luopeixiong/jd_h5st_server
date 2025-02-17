/**
 * File: h5st4.8.2.ts
 * Description: h5st4.8.2 算法
 * Author: zhx47
 */

import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseH5st } from './baseH5st';
import { H5stVersion, KVType, LocalTokenVersion } from './type';
import { H5stAlgoConfigCollection, H5stInitConfig } from '../../config/h5st.config';
import { ClsService } from 'nestjs-cls';
import { Cache, CACHE_MANAGER } from 'nestjs-cache-manager-v6';
import { TokenFactory } from '../../factory/token.factory';
import { CustomAlgorithm } from './customAlgorithm';

@Injectable()
export class H5st482 extends BaseH5st {
  protected readonly logger = new Logger(H5st482.name);
  constructor(
    protected readonly clsService: ClsService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    protected readonly tokenFactory: TokenFactory,
    protected readonly customAlgorithm: CustomAlgorithm,
  ) {
    super(clsService, cacheManager, tokenFactory.getInstance(LocalTokenVersion['04']), customAlgorithm);
  }

  init(h5stInitConfig: H5stInitConfig) {
    super.init(h5stInitConfig, H5stAlgoConfigCollection[H5stVersion['4.8.2']]);
  }

  __genSign(key: string, body: KVType[]): string {
    const paramsStr = super.__genSign(key, body);
    const signedStr = this.algos.MD5(`${key}${paramsStr}${key}`).toString(this.algos.enc.Hex);
    this._log(`__genSign, paramsStr:${paramsStr}, signedStr:${signedStr}`);
    return signedStr;
  }

  __genSignDefault(key: string, body: KVType[]): string {
    const paramsStr = super.__genSignDefault(key, body);
    const signedStr = this.algos.MD5(`${key}${paramsStr}${key}`).toString(this.algos.enc.Hex);
    this._log(`__genSignDefault, paramsStr:${paramsStr}, signedStr:${signedStr}`);
    return signedStr;
  }
}
