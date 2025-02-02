# frozen_string_literal: true
source "https://rubygems.org"

# Core gems
gem "jekyll", "~> 4.3.2"
gem "minima", "~> 2.5"
gem "kramdown-parser-gfm"

gem 'jekyll-scholar'


# Gems for BibTeX processing
group :jekyll_plugins do
  gem 'bibtex-ruby'
  gem 'citeproc-ruby'
  gem 'csl-styles'
  gem 'jekyll-feed'
  gem 'jekyll-seo-tag'
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end