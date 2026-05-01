import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const siteUrl = 'https://ronin2.com';

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),

	title: {
		default: 'Ronin2 | 1-99 Hard Emek Oldschool Metin2 PvP Server',
		template: '%s | Ronin2',
	},

	description:
		'Ronin2, 1-99 hard emek yapısıyla oldschool Metin2 PvP deneyimini yeniden sunan emek odaklı bir Metin2 serveridir. Ronin2 ve Ronin2008 tek çatı altında birleşiyor.',

	keywords: [
		'Ronin2',
		'Ronin2008',
		'Metin2 PvP',
		'Metin2 Pvp Server',
		'Metin2 Server',
		'Mt2 PvP',
		'Mt2 Server',
		'1-99 Metin2',
		'1-99 hard emek',
		'Hard emek Metin2',
		'Emek Metin2',
		'Oldschool Metin2',
		'Oldschool Metin2 PvP',
		'Metin2 Türkiye',
		'Metin2 orta emek',
		'Metin2 emek server',
		'Metin2 yeni server',
		'Metin2 açılış',
		'Metin2 lonca savaşı',
		'Metin2 farm server',
	],

	authors: [{ name: 'Ronin2' }],
	creator: 'Ronin2',
	publisher: 'Ronin2',
	applicationName: 'Ronin2',
	category: 'game',

	alternates: {
		canonical: '/',
		languages: {
			'tr-TR': '/',
		},
	},

	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},

	icons: {
		icon: [
			{
				url: '/img/favicon.png',
				type: 'image/png',
			},
		],
		apple: [
			{
				url: '/img/favicon.png',
				type: 'image/png',
			},
		],
	},

	openGraph: {
		locale: 'tr_TR',
		type: 'website',
		url: '/',
		siteName: 'Ronin2',
		title: 'Ronin2 | 1-99 Hard Emek Oldschool Metin2 PvP Server',
		description:
			'Ronin2 ve Ronin2008 tek çatı altında birleşiyor. 1-99 hard emek yapısı, oldschool Metin2 ruhu, emek odaklı farm sistemi ve rekabetçi PvP deneyimi Ronin2’de seni bekliyor.',
		images: [
			{
				url: '/youtube/2.png',
				width: 1200,
				height: 630,
				type: 'image/png',
				alt: 'Ronin2 1-99 Hard Emek Metin2 PvP Server tanıtım görseli',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: 'Ronin2 | 1-99 Hard Emek Metin2 PvP Server',
		description:
			'1-99 hard emek, oldschool Metin2 ruhu ve rekabetçi PvP deneyimi Ronin2’de yeniden başlıyor.',
		images: [
			{
				url: '/youtube/2.png',
				alt: 'Ronin2 Metin2 PvP Server tanıtım görseli',
			},
		],
	},

	other: {
		'format-detection': 'telephone=no',
		'og:image:secure_url': `${siteUrl}/youtube/2.png`,
		'og:image:alt': 'Ronin2 1-99 Hard Emek Metin2 PvP Server tanıtım görseli',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#080808',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="tr-TR">
		<body>{children}</body>
		</html>
	);
}