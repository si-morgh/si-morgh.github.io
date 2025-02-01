# frozen_string_literal: true

source "https://rubygems.org"
gemspec

gem "jekyll", ENV["JEKYLL_VERSION"] if ENV["JEKYLL_VERSION"]
gem "kramdown-parser-gfm" if ENV["JEKYLL_VERSION"] == "~> 3.9"

gem "jekyll-scholar", "~> 7.1"




# Gems for BibTeX processing
group :jekyll_plugins do
  gem 'bibtex-ruby'
  gem 'citeproc-ruby'
  gem 'csl-styles'
end