// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Applied Engineering Research Lab',
			description: 'Student-run engineering research, project documentation, and open technical work.',
			customCss: ['/src/styles/aerl.css'],
			disable404Route: true,
			logo: {
				src: '/src/assets/aerl-logo.png',
				alt: 'AERL logo',
				replacesTitle: true,
			},
			sidebar: [
				{
					label: 'Start Here',
					items: [
						{ label: 'Home', slug: '' },
					],
				},
				{
					label: 'About Us',
					items: [
						{ label: 'About Us', slug: 'about' },
						{ label: 'Lab Structure', slug: 'about/structure' },
					],
				},
				{
					label: 'Projects',
					items: [
						{ label: 'Projects', slug: 'projects' },
						{ label: 'FCS Overview', slug: 'projects/fcs' },
						{ label: 'Technical Approach', slug: 'projects/fcs/technical-approach' },
						{ label: 'Theory and Background', slug: 'projects/fcs/theory' },
						{ label: 'Timeline and Validation', slug: 'projects/fcs/timeline-validation' },
						{ label: 'Logs and Results', slug: 'projects/fcs/logs' },
						{ label: 'Committees', slug: 'projects/fcs/committees' },
					],
				},
				{
					label: 'Resources',
					items: [{ label: 'Resources', slug: 'resources' }],
				},
				{
					label: 'Community',
					items: [
						{ label: 'Updates', slug: 'updates' },
						{ label: 'Join and Contact', slug: 'join' },
					],
				},
			],
		}),
	],
});
