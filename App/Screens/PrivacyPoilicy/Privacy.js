import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Card, Container, useTheme } from 'react-native-basic-elements'
import SettingsHeader from '../../Components/Header/SettingsHeader'
import { moderateScale } from '../../Constants/PixelRatio'
import { FONTS } from '../../Constants/Fonts'
import SelectLan from '../../Components/Language/SelectLan'
import { ScrollView } from 'react-native-gesture-handler'
import useSelectLangue from '../../Components/Language/useSelectLangue'
import { useSelector } from 'react-redux'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Privacy = () => {

    const colors = useTheme();
    const { setLanguage } = useSelectLangue()
    const { selectLanguage } = useSelector(s => s.Language)

    return (

        <Container>
            <SettingsHeader headerText={SelectLan('Privacy Policy')} />
            <ImageBackground
                style={styles.bg_img}
                source={require('../../Assets/images/payment_bg.jpg')}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            height: moderateScale(50)
                        }}
                    />
                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    <Card style={{
                        ...styles.card,
                        marginBottom: 20,
                        backgroundColor: colors.pageBackgroundColor,
                        borderColor: colors.ttextgrey,
                    }}>
                        <Image
                            source={require('../../Assets/images/blue_logo.png')}
                            style={styles.image}
                        />
                        <View style={{
                            paddingHorizontal: moderateScale(5),
                        }}>

                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {SelectLan("This is a summary of our new privacy policy which takes effect on May 14th 2023. It covers every  Tasker website & mobile application that links here, and all of the products and services contained on those website & mobile applications. The detailed policy follows the same structure as this summary and constitutes the actual legal document. Our privacy commitment: Tasker has never sold your information to someone else for advertising, or made money by showing you other people's ads, and we never will. This has been our approach since the very beginning, and we remain committed to it. This policy tells you what information we do collect from you, what we do with it, who can access it, and what you can do about it.")}
                            </Text>

                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {SelectLan("We only collect the information that we actually need. Some of that is information that you actively give us when you register, sign up for an account, ask for customer support, or buy something from us. We store your name and contact information, but we don't store credit card numbers (except with your permission and in one of our secured payment gateways).")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: 10 }}>
                                {SelectLan("When you visit our website & mobile application or use our Tasker platform, we automatically log some basic information like how you got to the site, where you navigated within it, and what features and settings you use. We use this information to improve our website & mobile applications and services and to drive new product development. Sometimes we receive information indirectly. If you ask about our products through one of our referral programs or reselling partners, or sign in to one of our products through an authentication service provider like Facebook, LinkedIn, Amazon, or Google, they'll pass on your contact information to us. We'll use that information to complete the request that you made. If you engage with our brand on social media (for instance, liking, commenting, retweeting, mentioning, or following us), we'll have access to your interactions and profile information. We'll still have that information even if you later remove it from the social media site.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {SelectLan("What we do with your information")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {SelectLan("We use your information to provide the services you've requested, create and maintain your accounts, and keep an eye out for unauthorized activity on your accounts. We also use it to communicate with you about the products you're currently using, your customer support requests, new products you may like, chances for you to give us feedback, and policy updates. We analyze the information we collect to understand user needs and to improve our website & mobile applications and services.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: 10 }}>
                                {SelectLan("We're required to have a legal basis for collecting and processing your information. In most cases, we either have your consent or need the information to provide the service you've requested from us. When that's not the case, we must demonstrate that we have another legal basis, such as our legitimate business interests.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {setLanguage("You can decline certain kinds of information use either by not providing the information in the first place or by opting out later. You can also disable cookies to prevent your browser from giving us information, but if you do so, certain website & mobile application features may not work properly. We completely disable third-party cookies from all Tasker website & mobile applications and products. We limit access to your personal information to our employees and contractors who have a legitimate need to use it. If we share your information with other parties (like developers, capital investors, service providers, domain registrars, and reselling partners), they must have appropriate security measures and a valid reason for using your information, typically to serve you. The European Economic Area (EEA) provides certain rights to data subjects (including access, rectification, erasure, restriction of processing, data portability, and the right to object and to complain). Tasker undertakes to provide you the same rights no matter where you choose to live. We keep your personal information for as long as it is required for the purposes stated in this Privacy Policy. When we no longer have a legitimate need to process your information, we will delete, anonymize, or isolate your information, whichever is appropriate.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {SelectLan("Part II – Information that Tasker processes on your behalf")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: moderateScale(10) }}>
                                {setLanguage("If you handle other people's data using Tasker apps, such as information about your customers or employees, you are entrusting that data to us for processing. If you use a Tasker mobile app and give the app access to your contacts and photo library, you are entrusting data to us. The data you entrust to us for processing is called service data.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: moderateScale(10) }}>
                                {setLanguage("You own your service data. We protect it, limit access to it, and only process it according to your instructions. You may access it, share it through third-party integrations, and request that we export or delete it.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: moderateScale(10) }}>
                                {setLanguage("We hold the data in your account as long as you choose to use Tasker Services. After you terminate your account, your data will be automatically deleted from our active database within 6 months and from our backups within 3 months after that.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: moderateScale(10) }}>
                                {setLanguage("If you are in the European Economic Area and you believe that someone has entrusted your information to us for processing (for instance, your employer or a company whose services you use), you can request certain actions from us regarding your data. To exercise those data rights, please contact the person or company that entrusted the data to us and we will work with them on your request.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor, }}>
                                {setLanguage("Part III – General")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, }}>
                                {setLanguage("There are some limitations to the privacy we can promise you. We will disclose personal information if it's necessary to comply with a legal obligation, prevent fraud, enforce an agreement, or protect our users' safety. We do not currently honor Do Not Track signals from internet browsers; when a universal standard for processing them emerges, we will follow it. Third-party website & mobile applications and social media widgets have their own separate privacy policies. Always check the relevant privacy policy before sharing personal information with third parties.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: 10 }}>
                                {setLanguage("You can always contact us to: ask questions about our privacy practices, request a GDPR-compliant Data Processing Addendum, alert us if you believe we have collected personal data from a minor, or ask to have your personal information removed from our blogs or forums. We will contact you to let you know if we make any major changes to our privacy policy, or in the highly unlikely event that we ever decide to sell our business.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Privacy Policy")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("This Privacy Policy statement is made Tasker (collectively, 'we', 'us' or 'our') and is effective as of May 14, 2022.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Tasker’s Privacy Commitment")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("Tasker has concentrated on the privacy of customer data and user privacy since the very beginning. We ask for only the least amount of information necessary, gathering only what we believe is essential for doing business, or for the specific transaction at hand. We let customers know the information we have on them and allow them to opt out of specific engagements. But, by far, our biggest commitment is that we do not make a single dollar from advertising revenue—never have, never will. This means we avoid the fundamental conflict of interest between gathering customer information and fueling advertising revenue, and the unavoidable compromises in customer privacy that it brings.The goal of this policy is to make explicit the information we gather on our customers and users, how we will use it, and how we will not. This policy is unfortunately longer than we would like, but we must unambiguously address all the relevant cases. We will try and keep the language simple and direct as much as possible.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Scope of this Privacy Policy")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("This Privacy Policy applies to all Tasker website & mobile applications that link to it. It also applies to the products and services provided by Tasker through these website & mobile applications, our mobile applications, and applications posted by Tasker’s online marketplace and in other third-party online marketplaces. This Privacy Policy does not apply to any of our website & mobile applications, products or services that have a separate privacy policy. This Privacy Policy is divided into three parts:")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Part I – Information Tasker collects and controls")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("This part deals with how Tasker collects and uses information about website & mobile application visitors, potential customers, users of Tasker products and services, and others who contact Tasker through forms or email addresses published on or linked to our website & mobile applications.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Part II – Information that Tasker processes on your behalf")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("This part deals with how Tasker handles data that you entrust to Tasker when you use our products and services, or when you share any personal or confidential information with us while requesting customer support.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Part III – General")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("This part deals with topics that are relevant to both Parts I and II, and other general topics such as Tasker's security commitments and how we will inform you when we change this Privacy Policy.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Part I – Information Tasker collects and controls")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("What information Tasker collects")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("We collect information about you only if we need the information for some legitimate purpose. Tasker will have information about you only if (a) you have provided the information yourself via Document Import, API Connectivity, User Entered Details (b) Tasker has automatically collected the information, or (c) Tasker has obtained the information from a third party. Below we describe the various scenarios that fall under each of those three categories and the information collected in each one. Information that you provide us")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("i. Account signup:")} {''}
                                <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                    {setLanguage("When you sign up for an account to access one or more of our services, we ask for information like your name, contact number, email address, company name and country to complete the account signup process. You'll also be required to choose a unique username and a password for accessing the created account. You may also provide us with more information such as your photo, time zone and language, but we don’t require that information to sign up for an account. After signing up, you will have the option of choosing a security question and an answer to the security question — if you provide these, they will be used only while resetting your password.")}
                                </Text>
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("ii. Event registrations and other form submissions:")} {''}
                                <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                    {setLanguage("We record information that you submit when you (i) register for any event, including webinars or seminars, (ii) subscribe to our newsletter or any other mailing list, (iii) submit a form in order to download any product, whitepaper, or other materials, (iv) participate in contests or respond to surveys, or (v) submit a form to request customer support or to contact Tasker for any other purpose.")}
                                </Text>
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("iii. Payment processing:")} {''}
                                <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                    {setLanguage("When you buy something from us, we ask you to provide your name, contact information, and credit card information or other payment account information. When you submit your card information, our PSP (Payment Service Provider) stores the name and address of the cardholder, the expiry date and the last four digits of the credit card number. We do not store the actual credit card number. For quick processing of future payments, if you have given us your approval, we may store your credit card information or other payment information in an encrypted format in the secured servers of our Payment Gateway Service Providers.")}
                                </Text>
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("iv. Testimonials:")} {''}
                                <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                    {setLanguage("When you authorize us to post testimonials about our products and services on website & mobile applications, we may include your name and other personal information in the testimonial. You will be given an opportunity to review and approve the testimonial before we post it. If you wish to update or delete your testimonial, you can contact us at support@Tasker.com.mx.")}
                                </Text>
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("v. Interactions with Tasker:")} {''}
                                <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                    {setLanguage("We may record, analyze and use your interactions with us, including email, telephone, and chat conversations with our sales and customer support professionals, for improving our interactions with you and other customers. Information that we collect automatically")}
                                </Text>
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("i. Information from browsers, devices and servers: When you visit our website & mobile applications, we collect information that web browsers, mobile devices and servers make available, such as the internet protocol address, browser type, language preference, time zone, referring URL, date and time of access, operating Tasker platform, mobile device manufacturer and mobile network information. We include these in our log files to understand more about visitors to our website & mobile applications.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("ii. Information from first party cookies and tracking technologies: We use temporary and permanent cookies to identify users of our services and to enhance user experience. We embed unique identifiers in our downloadable products to track usage of the products. We also use cookies, beacons, tags, scripts, and other similar technologies to identify visitors, track website & mobile application navigation, gather demographic information about visitors and users, understand email campaign effectiveness and for targeted visitor and user engagement by tracking your activities on our website & mobile applications. We only use first-party cookies and do not use third-party cookies or other third-party tracking technologies on our website & mobile applications. We also use first-party Local Storage Objects (LSOs) such as HTML5 to store content information and preferences to provide certain features.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("iii. Information from application logs and mobile analytics: We collect information about your use of our products, services and mobile applications from application logs and in-house usage analytics tools, and use it to understand how your business use and needs can improve our products. This information includes clicks, scrolls, features accessed, access time and frequency, errors generated, performance data, storage utilized, user settings and configurations, and devices used to access and their locations.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Information that we collect from third parties")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("i. Signups using federated authentication service providers: You can log in to Tasker Services using supported federated authentication service providers such as Facebook, Amazon, LinkedIn, and Google. These services will authenticate your identity and give you the option to share certain personal information with us, such as your name and email address.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("ii. Referrals : If someone has referred any of our products or services to you through any of our referral programs, that person may have provided us your name, email address and other personal information. You may contact us at support@Tasker.com.mx to request that we remove your information from our database. If you provide us information about another person, or if another person gives us your information, we will only use that information for the specific reason for which it was provided to us.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("iii. Information from our reselling partners and service providers: If you contact any of our reselling partners, or otherwise express interest in any of our products or services to them, the reselling partner may pass your name, email address, company name and other information to Tasker. If you register for or attend an event that is sponsored by Tasker, the event organizer may share your information with us. Tasker may also receive information about you from review sites if you comment on any review of our products and services, and from other third-party service providers that we engage for marketing our products and services.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("iv. Information from social media sites and other publicly available sources: When you interact or engage with us on social media sites such as Facebook, Twitter, Google+ and Instagram through posts, comments, questions and other interactions, we may collect such publicly available information, including profile information, to allow us to connect with you, improve our products, or better understand user reactions and issues. We must tell you that once collected, this information may remain with us even if you delete it from the social media sites. Tasker may also add and update information about you, from other publicly available sources.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Purposes for using information")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: 10 }}>
                                {setLanguage("In addition to the purposes mentioned above, we may use your information for the following purposes:")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To communicate with you (such as through email) about products and services that you have signed up for, changes to this Privacy Policy, changes to the Terms of Service, or important notices;")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To keep you posted on new products and services, upcoming events, offers, promotions and other information that we think will be of interest to you;")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To ask you to participate in surveys, or to solicit feedback on our products and services;")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To set up and maintain your account, and to do all other things required for providing our services, such as enabling collaboration, providing website & mobile application and mail hosting, and backing up and restoring your data;")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To understand how users use our products and services, to monitor and prevent problems, and to improve our products and services;")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To provide customer support, and to analyze and improve our interactions with customers;")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To detect and prevent fraudulent transactions and other illegal activities, to report spam, and to protect the rights and interests of Tasker, Tasker’s users, third parties and the public;")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To update, expand and analyze our records, identify new customers, and provide products and services that may be of interest to you;")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To analyze trends, administer our website & mobile applications, and track visitor navigations on our website & mobile applications to understand what visitors are looking for and to better help them;")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {'==>'} {setLanguage("To monitor and improve marketing campaigns and make suggestions relevant to the user.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Legal bases for collecting and using information")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("Legal processing bases applicable to Tasker: If you are an individual from the European Economic Area (EEA), our legal basis for information collection and use depends on the personal information concerned and the context in which we collect it. Most of our information collection and processing activities are typically based on (i) contractual necessity, (ii) one or more legitimate interests of Tasker or a third party that are not overridden by your data protection interests, or (iii) your consent. Sometimes, we may be legally required to collect your information, or may need your personal information to protect your vital interests or those of another person. Withdrawal of consent: Where we rely on your consent as the legal basis, you have the right to withdraw your consent at any time, but this will not affect any processing that has already taken place. Legitimate interests notice: Where we rely on legitimate interests as the legal basis and those legitimate interests are not specified above, we will clearly explain to you what those legitimate interests are at the time that we collect your information.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Your choice in information use")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("Opt out of non-essential electronic communications: You may opt out of receiving newsletters and other non-essential messages by using the ‘unsubscribe’ function included in all such messages. However, you will continue to receive notices and essential transactional emails. Disable cookies: You can disable browser cookies before visiting our website & mobile applications. However, if you do so, you may not be able to use certain features of the website & mobile applications properly.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("Optional information: You can choose not to provide optional profile information such as your photo. You can also delete or change your optional profile information. You can always choose not to fill in non-mandatory fields when you submit any form linked to our website & mobile applications.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Who we share your information with")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("All Tasker has access to the information covered in Part I. We do not sell any personal information. We share your information only in the ways that are described in this Privacy Policy, and only with parties who adopt appropriate confidentiality and security measures. Employees and independent contractors: Employees and independent contractors of all Tasker has access to the information covered in Part I on a need-to-know basis. We require all employees and independent contractors of Tasker to follow this Privacy Policy for personal information that we share with them.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: 5 }}>
                                {setLanguage("Third-party service providers: We may need to share your personal information and aggregated or de-identified information with third-party service providers that we engage, such as marketing and advertising partners, event organizers, web analytics providers and payment processors. These service providers are authorized to use your personal information only as necessary to provide these services to us.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: 5 }}>
                                {setLanguage("Domain registrars: When you register a domain through Tasker from domain name registrars, we share your name and contact information such as your physical address, email address and phone number with them as per the ICANN domain registration rules. Reselling partners: We may share your personal information with our authorized reselling partners in your region, solely for the purpose of contacting you about products that you have downloaded or services that you have signed up for. We will give you an option to opt out of continuing to work with that partner.")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("Marketplace application developers: When you install or purchase any application developed using Tasker APIs that is posted on Tasker online Capital marketplace, your name and email address will be shared with the developer of the application, so they may engage with you directly as the provider of that application or service. Tasker does not control the use of your personal information by the developers, which will be based on their own privacy policies. Other cases: Other scenarios in which we may share the same information covered under Parts I and II are described in Part III.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Your rights with respect to information we hold about you as a controller")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`If you are in the European Economic Area (EEA), you have the following rights with respect to information that Tasker holds about you. Tasker undertakes to provide you the same rights no matter where you choose to live. Right to access: You have the right to access (and obtain a copy of, if required) the categories of personal information that we hold about you, including the information's source, purpose and period of processing, and the persons to whom the information is shared
Right to rectification: You have the right to update the information we hold about you or to rectify any inaccuracies. Based on the purpose for which we use your information, you can instruct us to add supplemental information about you in our database.
Right to erasure: You have the right to request that we delete your personal information in certain circumstances, such as when it is no longer necessary for the purpose for which it was originally collected.`)}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`IRight to restriction of processing: You may also have the right to request to restrict the use of your information in certain circumstances, such as when you have objected to our use of your data but we need to verify whether we have overriding legitimate grounds to use it.
Right to data portability: You have the right to transfer your information to a third party in a structured, commonly used and machine-readable format, in circumstances where the information is processed with your consent or by automated means.
Right to object: You have the right to object to the use of your information in certain circumstances, such as the use of your personal information for direct marketing.
Right to complain: You have the right to complain to the appropriate supervisory authority if you have any grievance against the way we collect, use or share your information. This right may not be available to you if there is no supervisory authority dealing with data protection in your country.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Retention of information")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`We retain your personal information for as long as it is required for the purposes stated in this Privacy Policy. Sometimes, we may retain your information for longer periods as permitted or required by law, such as to maintain suppression lists, prevent abuse, if required in connection with a legal claim or proceeding, to enforce our agreements, for tax, accounting, or to comply with other legal obligations. When we no longer have a legitimate need to process your information, 
we will delete or anonymize your information from our active databases. We will also securely store the information and isolate it from further processing on backup discs until deletion is possible.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Part II Information that Tasker processes on your behalf")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor, marginTop: 10 }}>
                                {setLanguage("Information entrusted to Tasker and purpose")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`Information provided in connection with services: You may entrust information that you or your organization (“you”) control, to Tasker in connection with use of our services or for requesting technical support for our products. This includes information regarding your customers and your employees (if you are a controller) or data that you hold and use on behalf of another person for a specific purpose, such as a customer to whom you provide services (if you are a processor). The data may either be stored on our servers when you use our services, or transferred or shared to us as part of a request for technical support or other services.
Information from mobile devices: When you elect to allow it, some of our mobile applications have access to the camera, call history, contact information, photo library, and other information stored on your mobile device. Our applications require such access to provide their services. Similarly, when you elect to provide access, location-based information is also collected for purposes including, but not limited to, locating nearby contacts or setting location-based reminders. This information will be exclusively shared with our mapping providers and will be used only for mapping user locations. You may disable the mobile applications' access to this information at any time by editing the settings on your mobile device. The data stored on your mobile device and their location information to which the mobile applications have access will be used in the context of the mobile application, and transferred to and associated with your account in the corresponding services (in which case the data will be stored on our servers) or products (in which case the data will remain with you unless you share it with us).`)}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("(All the information entrusted to Tasker is collectively termed “service data”)")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`(Ownership and control of your service data
We recognize that you own your service data. We provide you complete control of your service data by providing you the ability to (i) access your service data, (ii) share your service data through supported third-party integrations, and (iii) request export or deletion of your service data.
How we use service data 
We process your service data when you provide us instructions through the various modules of our services. For example, when you generate an invoice, information such as the name and address of your customer will be used to generate the invoice; and when you use our campaign management service for email marketing, the email addresses of the persons on your mailing list will be used for sending the emails.
Push notifications 
If you have enabled notification on our desktop and mobile applications, we will push notifications through a push notification provider such as Apple Push Notification Service, Google Cloud Messaging or Windows Push Notification Services. You can manage your push notification preferences or deactivate these notifications by turning off notifications in the application or device settings.
Who we share service data with 
Tasker and third party sub-processors: In order to provide services and technical support for our products, the contracting entity within Tasker engages other group entities and third parties.
Employees and independent contractors: We may provide access to your service data to our employees and individuals who are independent contractors of Tasker involved in providing the services (collectively our “employees”) so that they can (i) identify, analyze and resolve errors,`)}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`manually verify emails reported as spam to improve spam detection, or (iii) manually verify scanned images that you submit to us to verify the accuracy of optical character recognition. We ensure that access by our employees to your service data is restricted to specific individuals, and is logged and audited. Our employees will also have access to data that you knowingly share with us for technical support or to import data into our products or services. We communicate our privacy and security guidelines to our employees and strictly enforce privacy safeguards within Tasker.
Collaborators and other users: Some of our products or services allow you to collaborate with other users or third parties. Initiating collaboration may enable other collaborators to view some or all of your profile information. For example, when you edit a document that you have shared with other persons for collaboration, your name and profile picture will be displayed next to your edits to allow your collaborators to know that you made those edits.
Third-party integrations you have enabled: Most of our products and services support integrations with third-party products and services. If you choose to enable any third-party integrations, you may be allowing the third party to access your service information and personal information about you. We encourage you to review the privacy practices of the third-party services and products before you enable integrations with them.
Other cases: Other scenarios in which we may share information that are common to information covered under Parts I and II are described in Part III.
Retention of information 
We hold the data in your account as long as you choose to use Tasker Services. Once you terminate your Tasker user account, your data will eventually get deleted from active database during the next clean-up that occurs once in 6 months. The data deleted from active database will be deleted from backups after 3 months.
Data subject requests
If you are from the European Economic Area and you believe that we store, use or process your information on behalf of one of our customers, please contact the customer if you would like to access, rectify, erase, restrict or object to processing, or export your personal data. We will extend our support to our customer in responding to your request within a reasonable time-frame.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor, marginTop: 10 }}>
                                {setLanguage("Part III General")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor, marginTop: 10 }}>
                                {setLanguage("Children’s personal information")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`Our products and services are not directed to individuals under 18. Tasker does not knowingly collect personal information from children who are under 18 years of age. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information. If you believe that a child under 18 years has provided personal information to us, please write to support@Tasker.com.mx with the details, and we will take the necessary steps to delete the information we hold about that child.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor, marginTop: 10 }}>
                                {setLanguage("How secure is your information")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`At Tasker, we take data security very seriously. We have taken steps to implement appropriate administrative, technical & physical safeguards to prevent unauthorized access, use, modification, disclosure or destruction of the information you entrust to us. If you have any concerns regarding the security of your data, we encourage you to write to us at support@Tasker.com.mx with any questions.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor, marginTop: 10 }}>
                                {setLanguage("Data Protection Officer")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`We have appointed a Data Protection Officer to oversee our management of your personal information in accordance with this Privacy Policy. If you have any questions or concerns about our privacy practices with respect to your personal information, you can reach out to our Data Protection Officer by sending an email to legal@Tasker.com.mx.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor, marginTop: 10 }}>
                                {setLanguage("Locations and international transfers")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`We share your personal information and service data within the Tasker. By accessing or using our products and services or otherwise providing personal information or service data to us, you consent to the processing, transfer, and storage of your personal information or Service Data within the United States of America, the European Economic Area (EEA) and other countries where Tasker operates. Such transfer is subject to a group company agreement that is based on EU Commission’s Model Contractual Clauses.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor, marginTop: 10 }}>
                                {setLanguage("Data processing addendum")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`To enable you to be compliant with the data protection obligations under the General Data Protection Regulation, we are prepared to sign a Data Processing Addendum (DPA) that is based on Standard Contractual Clauses. You can request a DPA from Tasker by emailing support@Tasker.com.mx. Once we get your request, we'll forward the DPA to you for your signature.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Do Not Track (DNT) requests")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("Some internet browsers have enabled 'Do Not Track' (DNT) features, which send out a signal (called the DNT signal) to the website & mobile applications that you visit indicating that you don't wish to be tracked. Currently, there is no standard that governs what website & mobile applications can or should do when they receive these signals. For now, we do not take action in response to these signals.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("External links on our website & mobile applications")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("Some pages of our website & mobile applications may contain links to website & mobile applications that are not linked to this Privacy Policy. If you submit your personal information to any of these third-party sites, your personal information is governed by their privacy policies. As a safety measure, we recommend that you not share any personal information with these third parties unless you've checked their privacy policies and assured yourself of their privacy practices.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Blogs and forums")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("We offer publicly accessible blogs and forums on our website & mobile applications. Please be aware that any information you provide on these blogs and forums may be used to contact you with unsolicited messages. We urge you to be cautious in disclosing personal information in our blogs and forums. Tasker is not responsible for the personal information you elect to disclose publicly. Your posts and certain profile information may remain even after you terminate your account with Tasker. To request the removal of your information from our blogs and forums, you can contact us at support@Tasker.com.mx.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Social media widgets")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("Our website & mobile applications include social media widgets such as Facebook 'like' buttons and Twitter 'tweet' buttons that let you share articles and other information. These widgets may collect information such as your IP address and the pages you navigate in the website & mobile application, and may set a cookie to enable the widgets to function properly. Your interactions with these widgets are governed by the privacy policies of the companies providing them.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Disclosures in compliance with legal obligations")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("We may be required by law to preserve or disclose your personal information and service data to comply with any applicable law, regulation, legal process or governmental request, including to meet national security requirements.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Enforcement of our rights")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage("We may disclose personal information and service data to a third party if we believe that such disclosure is necessary for preventing fraud, investigating any suspected illegal activity, enforcing our agreements or policies, or protecting the safety of our users.")}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Business Transfers")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`We do not intend to sell our business. However, in the unlikely event that we sell our business or get acquired or merged, we will ensure that the acquiring entity is legally bound to honor our commitments to you. We will notify you via email or through a prominent notice on our website & mobile application of any change in ownership or in the uses of your personal information and service data. We will also notify you about any choices you may have regarding your personal information and service data.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Compliance with this Privacy Policy")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`We make every effort, including periodic reviews, to ensure that personal information you provide is used in conformity with this Privacy Policy. If you have any concerns about our adherence to this Privacy Policy or the manner in which your personal information is used, kindly write to us support@Tasker.com.mx. We'll contact you, and if required, coordinate with the appropriate regulatory authorities to effectively address your concerns.`)}
                            </Text>
                            <Text style={{ ...styles.MainText, color: colors.cardColor }}>
                                {setLanguage("Notification of changes")}
                            </Text>
                            <Text style={{ ...styles.smallText, color: colors.cardColor }}>
                                {setLanguage(`We may modify the Privacy Policy at any time, upon notifying you through a service announcement or by sending an email to your primary email address. If we make significant changes to the Privacy Policy that affect your rights, you will be provided with at least 30 days' advance notice of the changes by email to your primary email address. If you think that the updated Privacy Policy affects your rights with respect to your use of our products or services, you may terminate your use by sending us an email within 30 days. Your continued use after the effective date of changes to the Privacy Policy will be deemed to be your agreement to the modified Privacy Policy. You will not receive email notification of minor changes to the Privacy Policy. If you are concerned about how your personal information is used, you should check back at https://Tasker.com.mx/privacy periodically.`)}
                            </Text>

                        </View>
                    </Card>
                </ScrollView>
                <View style={{ height: moderateScale(150) }} />
            </ImageBackground>
        </Container>
    )
}

export default Privacy

const styles = StyleSheet.create({
    bg_img: {
        height: height,
        width: width,
    },
    image: {
        height: moderateScale(40),
        width: moderateScale(110),
        resizeMode: 'center',
        marginTop: moderateScale(15)
    },
    card: {
        marginHorizontal: moderateScale(15),
        borderRadius: 0,
        borderWidth: 0.2,

    },
    MainText: {
        marginTop: moderateScale(10),
        fontSize: moderateScale(14),
        fontFamily: FONTS.bold
    },
    smallText: {
        fontFamily: FONTS.medium,
        fontSize: moderateScale(12)
    }
})