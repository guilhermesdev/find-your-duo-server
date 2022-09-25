import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import {
	getWeekDaysAsString,
	getWeekDaysAsArray,
	convertHoursStringToMinutes,
	convertMinutesToHoursString
} from './utils';

const PORT = process.env.PORT || 5000;
const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(',') || '*';

const prisma = new PrismaClient();

const app = express();

app.use(cors({ origin: CORS_ORIGINS }));
app.use(express.json());

app.get('/games', async (_req, res) => {
	const games = await prisma.game.findMany({
		include: {
			_count: {
				select: {
					ads: true
				}
			}
		}
	});

	res.status(200).json(games);
});

app.get('/games/:id/ads', async (req, res) => {
	const gameId = req.params.id;

	const ads = await prisma.ad.findMany({
		select: {
			id: true,
			name: true,
			weekDays: true,
			gameId: true,
			hourStart: true,
			hourEnd: true,
			useVoiceChannel: true,
			yearsPlaying: true,
			createdAt: true
		},
		where: { gameId },
		orderBy: {
			createdAt: 'desc'
		}
	});

	const formattedAds = ads.map(ad => ({
		...ad,
		weekDays: getWeekDaysAsArray(ad.weekDays),
		hourStart: convertMinutesToHoursString(ad.hourStart),
		hourEnd: convertMinutesToHoursString(ad.hourEnd)
	}));

	res.status(200).json(formattedAds);
});

type AdRequestBody = {
	gameId: string;
	name: string;
	yearsPlaying: number;
	discord: string;
	weekDays: number[];
	hourStart: string;
	hourEnd: string;
	useVoiceChannel: boolean;
};

app.post('/ads', async (req, res) => {
	const {
		gameId,
		discord,
		hourEnd,
		hourStart,
		name,
		useVoiceChannel,
		weekDays,
		yearsPlaying
	} = req.body as AdRequestBody;

	const ad = await prisma.ad.create({
		data: {
			gameId,
			discord,
			name,
			hourStart: convertHoursStringToMinutes(hourStart),
			hourEnd: convertHoursStringToMinutes(hourEnd),
			useVoiceChannel,
			weekDays: getWeekDaysAsString(weekDays),
			yearsPlaying
		}
	});

	const formattedAd = { ...ad, weekDays: getWeekDaysAsArray(ad.weekDays) };

	return res.status(201).json(formattedAd);
});

app.get('/ads/:id/discord', async (req, res) => {
	const adId = req.params.id;

	const result = await prisma.ad.findUnique({
		where: { id: adId },
		select: { discord: true }
	});

	if (!result) {
		return res.status(404).json({ error: 'Discord name not found' });
	}

	res.status(200).json({ ...result });
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
