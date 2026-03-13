#!/bin/bash

slugs=(
acronym-generator
number-to-words-converter
readability-score-calculator
text-repeater
word-counter-live
binary-to-text-converter
html-minifier
json-to-csv-converter
open-graph-preview
robots-txt-generator
timestamp-converter
hourly-to-salary-calculator
pay-raise-calculator
speed-distance-time-calculator
budget-planner
credit-card-payoff-calculator
crypto-profit-calculator
freelance-rate-calculator
investment-return-calculator
mortgage-affordability-calculator
net-worth-calculator
rent-affordability-calculator
retirement-calculator
savings-goal-calculator
calorie-calculator
calorie-deficit-calculator
ideal-weight-calculator
macro-calculator
ovulation-calculator
pregnancy-due-date-calculator
protein-intake-calculator
running-pace-calculator
sleep-calculator
water-intake-calculator
color-code-converter
color-contrast-checker
gradient-generator
email-subject-line-generator
slogan-generator
keyword-density-checker
business-name-generator
countdown-timer
meeting-cost-calculator
online-stopwatch
password-strength-checker
flip-text-generator
morse-code-translator
roman-numeral-converter
)

for slug in "${slugs[@]}"; do
  mkdir -p "$slug"
done

echo "Folders created successfully."