import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as crypto from 'crypto';

@Injectable()
export class AwsService {
  bucketName = process.env.AWS_BUCKET_NAME;
  secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  accessKeyId = process.env.AWS_ACCESS_KEY;
  region = process.env.AWS_REGION;
  s3: S3;

  constructor() {
    this.s3 = new S3({
      secretAccessKey: this.secretAccessKey,
      accessKeyId: this.accessKeyId,
      region: this.region,
      signatureVersion: 'v4',
    });
  }

  async generateUplaodUrl() {
    const imageName = crypto.randomBytes(16).toString('hex');
    const params = { Bucket: this.bucketName, Key: imageName, Expires: 60 };
    const uploadUrl = await this.s3.getSignedUrlPromise('putObject', params);
    return { uploadUrl };
  }

  getS3UploadUrl() {
    return this.generateUplaodUrl();
  }
}
