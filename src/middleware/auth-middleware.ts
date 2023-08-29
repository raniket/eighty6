import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function authMiddleware(req, res, next) {
    const configService = new ConfigService();
    const staticToken = configService.get('STATIC_TOKEN');
    const token = req.headers['authorization'];

    if (token !== staticToken) {
        throw new UnauthorizedException('Invalid token');
    }

    next();
}
