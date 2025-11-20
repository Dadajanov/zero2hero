"use client"

import { motion } from "framer-motion"
import { ArrowRight, Building2, Target, TrendingUp, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function EmployersView() {
  const { t } = useTranslation('employers')
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t("findBestCandidates")}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t("accessToTalentedStudents")}
            </p>
            <motion.button
              onClick={() => router.push("/registration")}
              className="bg-primary hover:bg-blue-700 text-white rounded-xl px-8 py-4 font-semibold transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              {t("startSearching")}
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="relative h-96 bg-gradient-to-br from-primary-light to-primary rounded-2xl flex items-center justify-center"
          >
            <Building2 size={120} className="text-white opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("benefitsForEmployers")}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={48} />,
                title: t("qualifiedCandidates"),
                desc: t("accessToVerifiedStudents"),
              },
              {
                icon: <Target size={48} />,
                title: t("preciseMatching"),
                desc: t("smartMatchingAlgorithm"),
              },
              {
                icon: <TrendingUp size={48} />,
                title: t("timeSavings"),
                desc: t("fastSearchAndHiring"),
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-primary mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("howItWorks")}
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: t("companyRegistration"),
                desc: t("createCompanyProfile"),
              },
              {
                step: "2",
                title: t("postVacancies"),
                desc: t("publishVacanciesAndRequirements"),
              },
              {
                step: "3",
                title: t("receiveApplications"),
                desc: t("reviewCandidateProfiles"),
              },
              {
                step: "4",
                title: t("hireEmployees"),
                desc: t("selectBestCandidates"),
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                number: "500+",
                label: t("partnerCompanies"),
              },
              {
                number: "10,000+",
                label: t("activeCandidates"),
              },
              {
                number: "95%",
                label: t("successfulPlacements"),
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-xl text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("readyToFindBestEmployees")}
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("joinHundredsOfCompanies")}
          </motion.p>
          <motion.button
            onClick={() => router.push("/registration")}
            className="bg-white text-primary hover:bg-gray-100 rounded-xl px-8 py-4 font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {t("startNow")}
          </motion.button>
        </div>
      </section>
    </div>
  )
}
