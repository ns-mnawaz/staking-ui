import m from 'mithril';
import { solid } from '@mithril-icons/font-awesome/cjs';

const iconSearchSVG = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';
const iconClearSVG = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
const logoSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512px" height="512px" viewBox="0 0 512 512" version="1.1" style="zoom: 1;"><!-- Generator: Sketch 57.1 (83088) - https://sketch.com --><title>logo-white-with-bg</title><desc>Created with Sketch.</desc><g id="logo-white-with-bg" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect fill="#111111" x="0" y="0" width="512" height="512" visibility="hidden"></rect><circle stroke="#000000" id="circle1" stroke-width="3px" cy="256px" fill="#111111" r="250px" cx="256px" transform=""></circle><path d="M160.5,199.5 L160.5,319.5" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square"></path><path d="M160.5,199.5 L160.5,319.5" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(160.500000, 259.500000) rotate(60.000000) translate(-160.500000, -259.500000)"></path><path d="M160.5,199.5 L160.5,319.5" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(160.500000, 259.500000) rotate(-60.000000) translate(-160.500000, -259.500000)"></path><path d="M348.5,206.5 L348.5,256.5" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(348.500000, 231.500000) scale(1, -1) translate(-348.500000, -231.500000)"></path><path d="M385.739092,271 L385.739092,321" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(385.739092, 296.000000) scale(-1, 1) rotate(60.000000) translate(-385.739092, -296.000000)"></path><path d="M311.260908,271 L311.260908,321" id="Line" stroke="#FFFFFF" stroke-width="22" stroke-linecap="square" transform="translate(311.260908, 296.000000) scale(-1, 1) rotate(-60.000000) translate(-311.260908, -296.000000)"></path></g></svg>';

class Icons {
	readonly search = m.trust(iconSearchSVG);
	readonly clear = m.trust(iconClearSVG);
	readonly Qrcode = m(solid.Qrcode, { width: 30, height: 30 });
	readonly Barcode = m(solid.Barcode, { width: 30, height: 30 });
	readonly Braille = m(solid.Braille, { width: 30, height: 30, color: '#ffffff' });
	readonly Users = m(solid.Users, { width: 30, height: 30, color: '#ffffff' });
	readonly Certificate = m(solid.Certificate, { width: 30, height: 30, color: '#ffffff' });
	readonly Building = m(solid.Building, { width: 30, height: 30, color: '#ffffff' });
	readonly logo = m.trust(logoSVG);
}

export = new Icons();
