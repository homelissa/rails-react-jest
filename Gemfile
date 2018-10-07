module Bundler
  module Source
    class GHGit < ::Bundler::Source::Git
      def initialize(repo:, branch:)
        super('uri' => repo, 'git' => repo, 'ref' => branch)
      end

      def allow_git_ops?
        true
      end

      def remote_exists?
        git_proxy.revision rescue false
      end
    end
  end
  module Plugin
    module DSL
      class GHDependencyResolver
        attr_reader :gem_context, :name, :repo, :version, :branch, :rails_env
        def initialize(gem_context:, name:, repo:, version:, branch: '', rails_env:)
          @gem_context = gem_context
          @name = name
          @repo = repo
          @version = version
          @branch = branch == '' ? local_branch : branch
          @rails_env = rails_env
        end

        def gem
          if git_derived_branch
            git = Bundler::Source::GHGit.new(repo: repo, branch: git_derived_branch)
            dependency_branch = git.remote_exists? ? branch : env_derived_branch
          else
            dependency_branch = env_derived_branch
          end

          unless dependency_branch
            msg = "ERROR: Dependency branch for #{name} is required!"
            puts msg
            fail msg
          end

          gem_context.gem name, version, git: repo, branch: dependency_branch
        end

        def git_derived_branch
          branch
        end

        def env_derived_branch
          case rails_env
          when 'development', 'test', 'acceptance'
            'dev'
          when 'staging'
            'sqa'
          when 'val'
            'val' # @TODO: create val Rails.env
          when 'production'
            'prod'
          else
            'sqa'
          end
        end

        def local_branch
          br = `git branch | awk '/^\*/{print $2}'`.strip
          br == '' ? nil : br
        end
      end
    end
  end
end

source 'https://rubygems.org'

ruby '2.4.4'

if ENV['LOCAL_DEPENDENCIES'] == 'true'
  gem 'core_data_r4', path: '../portal-core-data'
elsif ENV['DEPLOYMENT_DEPENDENCIES'] == 'true'
  gem 'core_data_r4', path: '/opt/portal-core-data'
else
  Bundler::Plugin::DSL::GHDependencyResolver.new(
    gem_context: self,
    name: 'core_data_r4',
    repo: 'git@github.com:guardant/portal-core-data.git',
    version: '0.1.1',
    branch: `cat git_branch`.strip,
    rails_env: `cat rails_env`.strip
  ).gem
end

gem 'rake', '~> 11.3.0'
gem 'puma'
gem 'rack-canonical-host'
gem 'rails', '4.2.8'
gem 'rack', '~>1.6.2'
gem 'mysql2'
gem 'bitters'
gem 'bourbon'
gem 'clearance'
gem 'coffee-rails'
gem 'font-awesome-sass'
gem 'gon'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'neat'
gem 'net-sftp'
gem 'pundit', '~> 1.1.0'
gem 'bootstrap-sass', '~> 3.2.0'
gem 'bootstrap-select-rails'
gem 'autoprefixer-rails'
gem 'sass-rails', '>= 3.2'
gem 'simple_form'
gem 'slim-rails'
gem 'react-rails'
gem 'es5-shim-rails'
gem 'active_model_serializers', '~> 0.10.0'
gem 'jbuilder'
gem 'uglifier'
gem 'aws-sdk'
gem 'awesome_print'
gem 'wicked_pdf', '~>0.11.0'
gem 'rack-timeout', '0.3.2'
gem 'wkhtmltopdf-binary-edge' if RUBY_PLATFORM.include?('darwin')
gem "highcharts-rails"
gem 'rest-client'
gem 'restforce', '~> 2.4.2'
gem 'createsend'
gem 'turnout'
gem 'google_drive'
gem 'geocoder'
gem 'area'
gem 'xxhash'
gem 'twilio-ruby'
gem 'slack-notifier'
gem "browser"
gem 'activerecord-session_store'
gem 'redis-rails'
gem 'redis', '~> 3.3.5'
gem 'delayed_job'
gem 'delayed_job_active_record'
gem 'daemons'
gem "delayed_job_web"
gem "valid_email2"
gem 'webpacker'
gem 'sqlite3'
gem 'turbolinks'

gem "activerecord-nulldb-adapter", require: false

source 'https://rails-assets.org' do
  gem 'rails-assets-d3'
  gem 'rails-assets-lodash'
end

# for Style Guide
gem 'crass'
gem 'kramdown'
gem 'newrelic_rpm'
gem "newrelic-redis", '~> 2.0.0'
gem 'sprockets-rails', '~> 2.3.1'

group :production, :acceptance, :staging do
  gem 'heroku_rails_deflate'
end

group :test do
  gem 'fuubar'
  gem 'capybara', '~> 2.6.2'
  gem 'capybara-screenshot'
  gem 'poltergeist'
  gem 'simplecov'
  gem 'timecop'
  gem 'rspec_junit_formatter', github: 'circleci/rspec_junit_formatter'
  gem 'rspec-page-regression'
  gem 'sendgrid-ruby'
  gem 'airborne'
  gem "fakeredis", require: "fakeredis/rspec"
end

group :test, :development do
  gem 'dotenv-rails'
  gem 'rspec-rails'
  gem 'brakeman', require: false
  gem 'factory_girl_rails'
  gem 'rubocop', require: false
  gem 'rubocop-rspec', require: false
  gem 'faker'
  gem 'pry-byebug'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
  gem 'rails-erd'
  gem 'cucumber-rails', require: false
  gem 'database_cleaner'
  gem 'vcr'
  gem 'webmock'
end

group :development do
  gem 'diffy'
  gem 'ruby-prof'
  gem 'foreman'
  gem 'launchy'
  gem 'bullet'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'quiet_assets'
  gem 'guard', '~> 2'
  gem 'guard-rspec'
  gem 'guard-livereload'
  gem 'rb-fsevent'
  gem 'growl'
end
