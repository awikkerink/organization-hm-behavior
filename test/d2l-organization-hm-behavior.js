/* global describe, it, expect, fixture, beforeEach */

'use strict';

describe('d2l-organization-hm-behavior', function() {
	var
		component,
		image = {
			class: ['course-image'],
			properties: {
				name: 'image1'
			},
			rel: ['https://api.brightspace.com/rels/organization-image'],
			links: [
				{
					class: ['tile', 'low-density', 'max'],
					href: 'http://image.com/tile-low-density-max',
					rel: ['alternate'],
					type: 'image/jpeg'
				},
				{
					class: ['tile', 'high-density', 'max'],
					href: 'http://image.com/tile-high-density-max',
					rel: ['alternate'],
					type: 'image/jpeg'
				},
				{
					class: ['banner', 'low-density', 'max', 'narrow'],
					href: 'http://image.com/banner-narrow-low-density-max',
					rel: ['alternate'],
					type: 'image/jpeg'
				},
				{
					class: ['banner', 'high-density', 'max', 'narrow'],
					href: 'http://image.com/banner-narrow-high-density-max?test=value',
					rel: ['alternate'],
					type: 'image/jpeg'
				}
			]
		},
		imageLowd = {
			class: ['course-image'],
			properties: {
				name: 'image2'
			},
			rel: ['https://api.brightspace.com/rels/organization-image'],
			links: [
				{
					class: ['tile', 'low-density', 'max'],
					href: 'http://image.com/tile-low-density-max',
					rel: ['alternate'],
					type: 'image/jpeg'
				},
				{
					class: ['banner', 'low-density', 'max', 'narrow'],
					href: 'http://image.com/banner-narrow-low-density-max',
					rel: ['alternate'],
					type: 'image/jpeg'
				}
			]
		},
		imageLinked = {
			rel: ['https://api.brightspace.com/rels/organization-image'],
			href: 'http://image.com/some-image'
		},
		imageEntity,
		imageLowdEntity,
		imageLinkedEntity;

	beforeEach(function() {
		component = fixture('default-fixture');
		imageEntity = window.D2L.Hypermedia.Siren.Parse(image);
		imageLowdEntity = window.D2L.Hypermedia.Siren.Parse(imageLowd);
		imageLinkedEntity = window.D2L.Hypermedia.Siren.Parse({ entities: [imageLinked] })
			.getSubEntityByRel('https://api.brightspace.com/rels/organization-image');
	});

	describe('getDefaultImageLink', function() {
		it('should return undefined if a linked entity is passed in', function() {
			var link = component.getDefaultImageLink(imageLinkedEntity);
			expect(link).to.be.undefined;
		});
		it('should return high-density max image as a default image', function() {
			var link = component.getDefaultImageLink(imageEntity, 'tile');
			expect(link).to.equal(image.links[1].href);
		});
		it('should return low-density max image as a backup default image', function() {
			var link = component.getDefaultImageLink(imageLowdEntity, 'tile');
			expect(link).to.equal(imageLowd.links[0].href);
		});
		it('should get the appropiate image links from the class', function() {
			var link = component.getDefaultImageLink(imageEntity, 'narrow');
			expect(link).to.equal(image.links[3].href);
		});
	});

	describe('getImageSrcset', function() {
		it('should return undefined if a linked entity is passed in', function() {
			var link = component.getImageSrcset(imageLinkedEntity);
			expect(link).to.be.undefined;
		});
		it('should return a tile srcset based on the links available', function() {
			var link = component.getImageSrcset(imageEntity, 'tile');
			expect(link).to.equal('http://image.com/tile-low-density-max 540w, http://image.com/tile-high-density-max 1080w');
		});
		it('should return a banner srcset on the links available', function() {
			var link = component.getImageSrcset(imageEntity, 'narrow');
			expect(link).to.equal('http://image.com/banner-narrow-low-density-max 767w, http://image.com/banner-narrow-high-density-max?test=value 1534w');
		});
		it('should return a banner srcset with date timestamp when forceImageRefresh true', function() {
			var link = component.getImageSrcset(imageEntity, 'narrow', true);
			expect(link.search('http://image.com/banner-narrow-low-density-max\\?timestamp=[0-9]{13}')).to.equal(0);
			expect(link.search('http://image.com/banner-narrow-high-density-max\\?test=value&timestamp=[0-9]{13}')).to.not.equal(-1);
		});
	});
});
