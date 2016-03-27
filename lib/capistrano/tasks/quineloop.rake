namespace :quineloop do
  desc 'deploy site to server'
  task :deploy do
    src_dir = '/home/quinelooper/apps/quineloop_struct'
    out_dir = '/home/quinelooper/apps/quineloop_blog'
    on roles(:web) do
      execute(
        "cd #{src_dir} && git pull origin master"
      )
      build_command = "cd %s && ~/.rvm/bin/rvm ruby-2.0.0-p451 do jekyll b -s %s -d %s" % [
        src_dir, src_dir, out_dir
      ]
      execute(build_command)
    end
  end
end

