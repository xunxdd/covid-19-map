// cannot test components yet. set up issues

import { createLocalVue, shallowMount } from '@vue/test-utils';
import ConfirmedCaseMap from '../confirmed-case-map.vue';
import deaths from "@/assets/json-data/time_series_19-covid-Deaths.json";

describe('confirmed-case-map', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountComponent()
  })
  it('mounts', () => {
    console.log(wrapper.processData(deaths, 2));
  })
});

function mountComponent(options = {}) {
  let mountOptions = {
    localVue: createLocalVue(),
    render: jest.fn()
  };
  mountOptions = { ...mountOptions, options };
  return shallowMount(ConfirmedCaseMap, mountOptions);
}
