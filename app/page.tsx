'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconBrandDiscord, IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconShare } from '@tabler/icons-react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const texts = {
	heroTitle: 'Ronin2 & Ronin2008 tek çatı altında birleşti!',
};

const navigations = [
	{
		label: 'Tanıtım',
		href: 'https://ronin2.com/landing',
	},
	{
		label: 'Kayıt Ol',
		href: 'https://ronin2.com/birlik/register',
	},
	{
		label: 'İndir',
		href: 'https://ronin2.com/birlik/download',
	},
	{
		label: 'Etkinlik',
		href: 'https://ronin2.com/birlik/event',
	},
	{
		label: 'Kurallar',
		href: 'http://ronin2.com/birlik/penalty/rules',
	},
];

const socialLinks = [
	{
		label: 'Facebook',
		href: 'https://www.facebook.com/efsanelerburda2',
		icon: <IconBrandFacebook size="1.3rem" />,
	},
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/metin2ronin_/',
		icon: <IconBrandInstagram size="1.3rem" />,
	},
	{
		label: 'Tiktok',
		href: 'https://www.tiktok.com/@metin2ronin',
		icon: <IconBrandTiktok size="1.3rem" />,
	},
	{
		label: 'Discord',
		href: 'https://discord.com/invite/Tpf6xUDXSV',
		icon: <IconBrandDiscord size="1.3rem" />,
	},
];

const servers = [
	{
		name: 'Birlik',
		badge: '1.5 Yıldır Kesintisiz Aktif!',
		description: '1-99 Hard Emek Yapısı',
		landingHref: 'https://ronin2.com/landing',
		siteHref: 'https://ronin2.com/birlik',
	},
];

const discordInviteLink = 'https://discord.com/invite/Tpf6xUDXSV';

export default function HomePage() {
	const particlesCanvasRef = useRef<HTMLCanvasElement | null>(null);

	const [ isLoading, setIsLoading ] = useState(false);
	const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false);
	const [ isSocialDropdownOpen, setIsSocialDropdownOpen ] = useState(false);

	const closeMenu = useCallback(() => {
		setIsMobileMenuOpen(false);
		setIsSocialDropdownOpen(false);
		document.body.style.overflow = '';
	}, []);

	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen((prev) => {
			const next = !prev;
			document.body.style.overflow = next ? 'hidden' : '';
			return next;
		});
	}, []);

	useEffect(() => {
		document.body.classList.toggle('is-loading', isLoading);
	}, [ isLoading ]);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => {
			window.clearTimeout(timeout);
		};
	}, []);

	useEffect(() => {
		const handleDocumentClick = (event: MouseEvent) => {
			const navLinks = document.getElementById('navLinks');
			const hamburger = document.getElementById('hamburger');

			if(
				isMobileMenuOpen &&
				navLinks &&
				hamburger &&
				!navLinks.contains(event.target as Node) &&
				!hamburger.contains(event.target as Node)
			)
			{
				closeMenu();
			}
		};

		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, [ closeMenu, isMobileMenuOpen ]);

	useEffect(() => {
		const fadeElements = document.querySelectorAll<HTMLElement>(
			'.section-badge, .section-title, .section-desc, ' +
			'.feature-card, .season-card, .showcase-card, ' +
			'.about-row-image, .about-row-text, ' +
			'.roadmap-step, .trust-stats, ' +
			'.final-cta-title, .final-cta-text, .final-cta-buttons',
		);

		fadeElements.forEach((element) => {
			element.classList.add('fade-in');
		});

		if(!('IntersectionObserver' in window)) {
			fadeElements.forEach((element) => {
				element.classList.add('visible');
			});

			return;
		}

		const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					const element = entry.target as HTMLElement;

					if(entry.isIntersecting) {
						const parent = element.parentElement;

						if(parent) {
							const siblings = Array.from(parent.children).filter((child) =>
								child.classList.contains('fade-in'),
							);

							const index = siblings.indexOf(element);

							if(index > 0) {
								element.style.transitionDelay = `${index * 0.08}s`;
							}
						}

						element.classList.add('visible');
					}
					else {
						element.classList.remove('visible');
						element.style.transitionDelay = '0s';
					}
				});
			},
			{
				threshold: 0.15,
				rootMargin: '0px 0px -40px 0px',
			},
		);

		fadeElements.forEach((element) => {
			observer.observe(element);
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		const canvas = particlesCanvasRef.current;

		if(!canvas) return;

		const ctx = canvas.getContext('2d');

		if(!ctx) return;

		type Particle = {
			x: number;
			y: number;
			size: number;
			speedX: number;
			speedY: number;
			alpha: number;
			pulse: number;
			pulseSpeed: number;
		};

		let particles: Particle[] = [];
		let animId = 0;
		let resizeTimeout = 0;

		const getParticleCount = () => {
			const width = canvas.width;

			if(width < 600) return 30;
			if(width < 1024) return 50;

			return 70;
		};

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		const createParticle = (): Particle => {
			const size = Math.random() * 2.2 + 1;

			return {
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size,
				speedX: (Math.random() - 0.5) * 0.25,
				speedY: -(Math.random() * 0.2 + 0.05),
				alpha: Math.random() * 0.3 + 0.08,
				pulse: Math.random() * Math.PI * 2,
				pulseSpeed: Math.random() * 0.008 + 0.003,
			};
		};

		const initParticles = () => {
			particles = [];

			const count = getParticleCount();

			for (let i = 0; i < count; i += 1) {
				particles.push(createParticle());
			}
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particles.forEach((particle) => {
				particle.x += particle.speedX;
				particle.y += particle.speedY;
				particle.pulse += particle.pulseSpeed;

				if(particle.y < -10) {
					particle.y = canvas.height + 10;
					particle.x = Math.random() * canvas.width;
				}

				if(particle.x < -10) {
					particle.x = canvas.width + 10;
				}

				if(particle.x > canvas.width + 10) {
					particle.x = -10;
				}

				let currentAlpha = particle.alpha + Math.sin(particle.pulse) * 0.06;

				if(currentAlpha < 0.02) {
					currentAlpha = 0.02;
				}

				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(160, 30, 20, ${currentAlpha * 0.12})`;
				ctx.fill();

				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(180, 40, 28, ${currentAlpha})`;
				ctx.fill();
			});

			animId = window.requestAnimationFrame(animate);
		};

		const handleResize = () => {
			window.clearTimeout(resizeTimeout);

			resizeTimeout = window.setTimeout(() => {
				resizeCanvas();
				initParticles();
			}, 200);
		};

		const handleVisibilityChange = () => {
			if(document.hidden) {
				window.cancelAnimationFrame(animId);
			}
			else {
				animate();
			}
		};

		resizeCanvas();
		initParticles();
		animate();

		window.addEventListener('resize', handleResize);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			window.cancelAnimationFrame(animId);
			window.clearTimeout(resizeTimeout);
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, []);

	return (
		<>
			{isLoading && (
				<div
					id="pageLoader"
					className="page-loader"
					aria-live="polite"
					aria-label="Site yukleniyor"
				>
					<div className="page-loader-inner">
						<img src={`${basePath}/img/logo.png`} alt="Ronin2" className="page-loader-logo" />
						<div className="page-loader-spinner" aria-hidden="true" />
						<p className="page-loader-text">Yükleniyor...</p>
					</div>
				</div>
			)}

			<canvas id="particles" ref={particlesCanvasRef} className="global-particles" />

			<nav id="navbar" className="navbar">
				<div className="navbar-inner">
					<img src={`${basePath}/img/logo.png`} alt="Ronin2 Logo" className="mobile-nav-logo" />

					<ul id="navLinks" className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
						{
							navigations.map((navRow, navKey) => {
								return (
									<li
										key={navKey}
									>
										<a
											href={navRow.href}
											className="nav-btn nav-btn-primary"
										>
											{navRow.label}
										</a>
									</li>
								);
							})
						}
					</ul>

					<div className="nav-right">
						<div className={`social-dropdown ${isSocialDropdownOpen ? 'open' : ''}`} id="social-dropdown">
							<button
								type="button"
								className="social-drop-btn"
								onClick={() => setIsSocialDropdownOpen((prev) => !prev)}
							>
								<IconShare size={17} stroke={2.2} />
								<span data-lang="social-media">Sosyal Medya</span>
								<span className="lang-arrow">▾</span>
							</button>

							<div className="social-drop-menu" id="social-drop-menu">
								{
									socialLinks.map((socialRow, socialKey) => {
										return (
											<a
												key={socialKey}
												href={socialRow.href}
												target="_blank"
												rel="noopener noreferrer"
												className="sdm-item"
											>
												{socialRow.icon}
												{socialRow.label}
											</a>
										);
									})
								}
							</div>
						</div>
						<button
							id="hamburger"
							className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
							aria-label="Menüyü Aç"
							onClick={toggleMobileMenu}
						>
							<span />
							<span />
							<span />
						</button>
					</div>
				</div>
			</nav>

			<div
				id="navOverlay"
				className={`nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}
				onClick={closeMenu}
			/>

			<section id="hero" className="hero">
				<div className="hero-bg">
					<video className="hero-bg-video" autoPlay muted loop playsInline>
						<source src={`${basePath}/img/bg.mp4`} type="video/mp4" />
					</video>

					<div className="hero-bg-overlay" />
				</div>

				<div className="hero-content">
					<div className="hero-logo-wrap">
						<img src={`${basePath}/img/logo.png`} alt="Ronin2 Logo" className="hero-logo-img" />
					</div>

					<div className="hero-launch-date">
						<div className="launch-date-badge">
							<div className="launch-label launch-label-shine">
								{texts.heroTitle}
							</div>
						</div>
					</div>

					<div style={{ display: 'flex', gap: '100px', justifyContent: 'center' }}>

						{
							servers.map((serverRow, serverKey) => {
								return (
									<div
										key={serverKey}
										className="hero-cta"
									>
										<article className="hero-server-card">
											<span className="server-badge">{serverRow.badge}</span>
											<h3 className="server-name">{serverRow.name}</h3>
											<p className="server-date">{serverRow.description}</p>
											<div className="server-card-actions">
												<a href={serverRow.landingHref} className="btn btn-secondary">
													Tanıtım
												</a>
												<a
													href={serverRow.siteHref}
													className="btn btn-primary"
												>
													Siteye Git
												</a>
											</div>
										</article>
									</div>
								);
							})
						}

					</div>
				</div>
			</section>


			<a
				href={discordInviteLink}
				target="_blank"
				rel="noopener noreferrer"
				className="discord-invite-badge"
			>
				<span className="discord-invite-icon">
					<IconBrandDiscord size={28} stroke={2.2} />
				</span>
				<span className="discord-invite-text">
					Discord Sunucumuza Katıl!
				</span>
			</a>
		</>
	);
}