FROM mysql:latest


ENV MYSQL_ROOT_PASSWORD 123  
ENV MYSQL_DATABASE imgstats  
ENV MYSQL_USER imgstats_user  
ENV MYSQL_PASSWORD 123

ADD setup.sql /docker-entrypoint-initdb.d