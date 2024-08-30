"use client"
import { motion } from 'framer-motion'
import React from 'react'

const Contact = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Get in Touch</h3>
        <div className="flex justify-end ">
          {/* Form Section */}
          <div className="w-full md:w-1/2 lg:w-1/3 border p-10 border-gray-600 rounded-lg border-r-8 ">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg mx-auto md:mx-0 "
            >
              <div className="form-control mb-6">
                <input type="text" id="name" required className="input-line" />
                <label htmlFor="name">
                  <span style={{ transitionDelay: "0ms" }}>N</span>
                  <span style={{ transitionDelay: "50ms" }}>a</span>
                  <span style={{ transitionDelay: "100ms" }}>m</span>
                  <span style={{ transitionDelay: "150ms" }}>e</span>
                </label>
              </div>
              <div className="form-control mb-6">
                <input type="email" id="email" required className="input-line" />
                <label htmlFor="email">
                  <span style={{ transitionDelay: "0ms" }}>E</span>
                  <span style={{ transitionDelay: "50ms" }}>m</span>
                  <span style={{ transitionDelay: "100ms" }}>a</span>
                  <span style={{ transitionDelay: "150ms" }}>i</span>
                  <span style={{ transitionDelay: "200ms" }}>l</span>
                </label>
              </div>
              <div className="form-control mb-6">
                <textarea id="message" rows={4} required className="input-line"></textarea>
                <label htmlFor="message">
                  <span style={{ transitionDelay: "0ms" }}>M</span>
                  <span style={{ transitionDelay: "50ms" }}>e</span>
                  <span style={{ transitionDelay: "100ms" }}>s</span>
                  <span style={{ transitionDelay: "150ms" }}>s</span>
                  <span style={{ transitionDelay: "200ms" }}>a</span>
                  <span style={{ transitionDelay: "250ms" }}>g</span>
                  <span style={{ transitionDelay: "300ms" }}>e</span>
                </label>
              </div>
              <button className="send-button">
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>Send</span>
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
