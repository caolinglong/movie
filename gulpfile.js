var gulp=require('gulp'),
    concat=require('gulp-concat'),
    browserSync=require('browser-sync').create(),//引用browser-sync、创建restful服务器
    reload = browserSync.reload,//调用服务器的reload方法
    sass=require('gulp-sass'),
    uglify=require('gulp-uglify');
//var clean = require('gulp-clean');
//合并js
gulp.task('cons',function(){
    gulp.src(['second.js','first.js'])//引入将要操作的文件到gulp流（类似于管道）
        .pipe(concat('concat.js'))//在pipe节点做相应的操作
        .pipe(gulp.dest('con/'));//输出到对应的目录
});
//自己配置一个服务器
gulp.task('server',function(){//给任务自定义一个名字
    browserSync.init({//初始化服务器
        server:"./",//配置服务器的运行目录
        startPath:'index.html'
    });
    gulp.watch('index.html').on('change',reload);//监听文件，并触发reload方法
    gulp.watch('scss/*.scss',['sass']) ;//监听文件，并触发reload方法
});


//编译sass
gulp.task('sass',function(){
    gulp.src('scss/main.scss')
        .pipe(sass())
        .on('error',function(err){
            console.log(err.message);
        })
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}))
} );
//压缩js
gulp.task('minjs',function(){
    /*gulp.src(['js/first.js','js/second.js'])//引入将要操作的文件到gulp流（类似于管道）
        .pipe(concat('concat.js'))//在pipe节点做相应的操作
        .pipe(uglify())
        .pipe(gulp.dest('minjs'))*/
});
//删除
gulp.task('clean',function () {
 gulp.src(['css','minjs'])
 .pipe(clean())
 });

gulp.task('default',['minjs']);


