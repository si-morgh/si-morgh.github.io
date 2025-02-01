# Create a new file: _plugins/bibtex.rb
require 'bibtex'
require 'citeproc'
require 'csl/styles'

module Jekyll
  class ScholarList < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @path = text.strip
    end

    def render(context)
      # Read the BibTeX file
      bib = BibTeX.open(File.join(context.registers[:site].source, @path))
      
      # Set up the CSL processor
      style = CSL::Style.load('apa')
      cp = CiteProc::Processor.new style: style, format: 'html'

      # Convert entries to HTML
      html = "<div class='publications'>\n"
      
      # Sort entries by year in reverse order
      bib.entries.sort_by { |e| -e.year.to_i }.each do |entry|
        cp.import [entry.to_citeproc]
        citation = cp.render(:bibliography, id: entry.key).first
        
        html += "<div class='publication'>\n"
        html += citation
        
        # Add links if available
        if entry.url
          html += "<br><a href='#{entry.url}' class='paper-link'>Paper</a>"
        end
        if entry.doi
          html += "<a href='https://doi.org/#{entry.doi}' class='doi-link'>DOI</a>"
        end
        html += "</div>\n"
      end
      
      html += "</div>"
      html
    end
  end
end

Liquid::Template.register_tag('bibliography', Jekyll::ScholarList)
