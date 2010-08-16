set :user, ""
set :password, ""
set :port, ""

role :web, ""

task :deploy_blog, :roles => :web do
  run "cd /home/trnscofi/sites/ && git clone git://github.com/gautamc/trnscofi_blog trnscofi_struct"
end

task :gen_blog, :roles => :web do
  run "cd /home/trnscofi/sites/trnscofi_struct && git pull origin master"
  run "jekyll /home/trnscofi/sites/trnscofi_struct  /home/trnscofi/sites/trnscofi_blog"
end
