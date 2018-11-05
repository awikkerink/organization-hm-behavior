import '../d2l-organization-hm-behavior.js';
import '../../@polymer/polymer/polymer-legacy.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
	is: 'consumer-element',
	behaviors: [
		D2L.PolymerBehaviors.Hypermedia.OrganizationHMBehavior
	]
});
