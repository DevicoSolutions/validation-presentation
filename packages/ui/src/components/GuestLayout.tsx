import { memo, ReactNode } from 'react'
import stail from 'stail'

export interface GuestLayoutProps {
  children: ReactNode | undefined
  label: ReactNode
}

export const GuestLayout = memo(function GuestLayout({
  children,
  label,
}: GuestLayoutProps) {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>{label}</Title>
        <Content>{children}</Content>
      </ContentWrapper>
    </PageWrapper>
  )
})

export const Title = stail.div`flex-1 px-2 mx-2 pb-4 text-white flex justify-center text-4xl font-title font-bold`

const PageWrapper = stail.div`flex w-full items-center justify-center`
const ContentWrapper = stail.div`flex flex-col`
const Content = stail.div`flex p-4 rounded-lg gap-2 flex-col w-[30rem] h-auto glass`
