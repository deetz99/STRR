import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mockHostApplication } from '../mocks/mockedData'
import { enI18n } from '../mocks/i18n'
import ApplicationDetails from '~/pages/examine/[applicationId].vue'
import {
  ApplicationInfoHeader, HostSubHeader, HostSupportingInfo,
  StrataSubHeader, PlatformSubHeader, UBadge, UButton,
  StrataSupportingInfo
} from '#components'

vi.mock('@/stores/examiner', () => ({
  useExaminerStore: () => ({
    getNextApplication: vi.fn().mockResolvedValue(mockHostApplication)
  })
}))

describe('Examiner - Host Application Details Page', () => {
  let wrapper: any

  beforeAll(async () => {
    wrapper = await mountSuspended(ApplicationDetails, {
      global: { plugins: [enI18n] }
    })
  })

  it('renders Application Details page and its components', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(ApplicationInfoHeader).exists()).toBe(true)
    expect(wrapper.findComponent(HostSubHeader).exists()).toBe(true)
    expect(wrapper.findComponent(HostSupportingInfo).exists()).toBe(true)
    expect(wrapper.findComponent(StrataSubHeader).exists()).toBe(false)
    expect(wrapper.findComponent(StrataSupportingInfo).exists()).toBe(false)
    expect(wrapper.findComponent(PlatformSubHeader).exists()).toBe(false)
  })

  it('renders ApplicationInfoHeader component for Host application', () => {
    const appHeaderInfo = wrapper.findComponent(ApplicationInfoHeader)
    expect(appHeaderInfo.exists()).toBe(true)
    expect(appHeaderInfo.findComponent(UBadge).exists()).toBe(true)
    expect(appHeaderInfo.findTestId('strata-brand-website').exists()).toBe(false)

    const appHeaderInfoText = appHeaderInfo.text()
    expect(appHeaderInfoText).toContain(mockHostApplication.header.applicationNumber)
    expect(appHeaderInfoText).toContain(mockHostApplication.header.examinerStatus)
    expect(appHeaderInfoText).toContain(mockHostApplication.registration.unitAddress!.nickname)
    expect(appHeaderInfoText).toContain('Host')
  })

  it('renders Host SubHeader component for Host application', () => {
    const hostSubHeader = wrapper.findComponent(HostSubHeader)
    expect(hostSubHeader.exists()).toBe(true)

    const { registration } = mockHostApplication
    const hostSubHeaderText = hostSubHeader.text()
    expect(hostSubHeaderText).toContain(registration.unitAddress!.streetName)
    expect(hostSubHeaderText).toContain(registration.strRequirements!.organizationNm)
    expect(hostSubHeaderText).toContain(registration.primaryContact!.firstName)
    expect(hostSubHeaderText).toContain(registration.unitDetails!.parcelIdentifier)
  })

  it('renders Host Supporting Info component for Host application', () => {
    const hostSupportingInfo = wrapper.findComponent(HostSupportingInfo)
    expect(hostSupportingInfo.exists()).toBe(true)

    expect(hostSupportingInfo.exists()).toBe(true)
    expect(hostSupportingInfo.findTestId('str-prohibited-section').exists()).toBe(false)
    expect(hostSupportingInfo.findTestId('business-lic-section').exists()).toBe(true)
    expect(hostSupportingInfo.findTestId('open-business-lic-btn').exists()).toBe(true)
    expect(hostSupportingInfo.findTestId('business-lic-section').text())
      .toContain(mockHostApplication.registration.unitDetails!.businessLicense)
    expect(hostSupportingInfo.findTestId('business-lic-section').findAllComponents(UButton).length).toBe(1)
    expect(hostSupportingInfo.findTestId('pr-req-section').exists()).toBe(true)
    expect(hostSupportingInfo.findTestId('pr-req-documents').exists()).toBe(true)
    expect(hostSupportingInfo.findTestId('pr-req-documents').findAllComponents(UButton).length).toBe(1)
  })
})
