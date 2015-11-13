<?php
/**
 * @package VintageRadio
 */
?>

<!--DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"-->
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>

<head>
<a href="https://plus.google.com/106394215760330423809" rel="publisher">Google+</a>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>
	
	<link rel="shortcut icon" href="<?php echo bloginfo('template_url'); ?>/img/favicon.png"/>
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo bloginfo('template_url'); ?>/ideax/modal.css">
	<!--[if  IE]> <link rel="stylesheet" href="<?php echo bloginfo('template_url'); ?>/style-ie.css" type="text/css" media="screen" /> <![endif]-->
	
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>><div class="all">

	<!--

	НАЧАЛО БЛОКА IDEA X!

	\
	<a href="/ideax" id="fixed-link"></a>
	<div id="modal-ideax" class="hidden">
		
		<div class="inner">
			<div class="top">
				Допоможи Радіо КПІ виграти 100000 грн. у конкурсі Nescafe Idea X
			</div>
			<div class="bottom">
				<a href="/ideax" class="btn-main">
					Підтримати
				</a><br>
				<a href="javascript:void(0);" id="refuse" class="small">
					Ні, не хочу
				</a>
			</div>
			

		</div>

	</div>	

	<script type="text/javascript">
		var getCookie = function(name) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + name + "=");
			if (parts.length == 2) return parts.pop().split(";").shift();
		}

		if (jQuery('#modal-ideax').hasClass('hidden') && !getCookie('ideax-refuse')) {
			jQuery('#modal-ideax').removeClass('hidden');
		}

		jQuery('#refuse').click(function() {
			jQuery('#modal-ideax').addClass('hidden');
			document.cookie = "ideax-refuse=true";
			console.log('wow');
		})
		


	</script>

	<!--

	КОНЕЦ БЛОКА IDEA X!

	-->
	<div class="bgr">
		<img class="mic" src="<?php echo bloginfo('template_url'); ?>/img/mic-big.jpg" alt="" />
	</div>
	<div class="maincol"><div class="in">
		<div class="header"><div class="iin">
			<h1><a href="<?php echo get_option('home'); ?>/"><img src="<?php echo bloginfo('template_url'); ?>/img/header.gif" alt="RADIO" title="RADIO" width="396" height="109"/></a></h1>
			<a id="btnOn" href="#showcontent" onClick="conton();" title="Вернуть на место"></a>

			<?php /*
				Нам не совсем то и нужен Flash. К тому же, этот плеер вообще очень криво работал всегда.
				Заменил скрипт проигрывателя на актуальный c r.kpi.ua/player
				
				Когда новый сайт будет, товарищи?

				@Юра
			*/ ?>

			<div class="radio">
				<img class="radiobutton a" id="radiobutton" name="radiobutton" onClick="radioClick();" src="<?php echo bloginfo('template_url'); ?>/img/player-play.gif" alt="play radio" width="107" height="110"/>
				<div class="nowplay" style="overflow:hidden;">
					<?php 
					//	<div class="nowlabel">играет: </div>
					?>
					<span id="ticker" name="ticker" style="white-space: nowrap; width: auto; overflow: auto; display: inline-block;">loading...</span>
				</div>
				
					<?php /*
					<img id="eqoff" src="<?php echo bloginfo('template_url'); ?>/img/equilizer.gif" alt="off" width="57" height="20"/>
					<div id="eqon"><div id="eqinside">Flash был тут</div></div>
					<div class="msg"><?php echo get_theme_mod('day_message'); ?></div> */ 
					?>

			</div>
		</div></div>

		
		<h2><a href="<?php echo get_category_link(get_theme_mod('news_cat')); ?>">Новости</a></h2>
		<div class="mpblock mpprog">
			<?php $second_query = new WP_Query("posts_per_page=".get_theme_mod('news_num')); ?>
			<?php if ($second_query->have_posts()) : ?>	
				<?php while ($second_query->have_posts()) : $second_query->the_post(); ?>
					<div class="homepost">
					<a href="<?php the_permalink() ?>"><?php the_title(); ?></a> <span class="meta">(<?php the_time('j.m.Y') ?>)</span>
					<p><?php global $post; the_content_limit($post, 200, ""); ?></p>
					</div>
				<?php endwhile; ?>
			<?php else : ?>
				<p>А что, вообще, в мире делается?… Стабильности нет.</p>
			<?php endif; wp_reset_query(); ?>
		</div>
		<h2><a href="<?php echo get_page_link(get_theme_mod('about_id')); ?>">О проекте</a></h2>
		<div class="mpblock mpabout"><p><?php echo get_theme_mod('about_message'); ?></p></div>
		<h2><a href="<?php echo get_page_link(get_theme_mod('progs_id')); ?>">Передачи</a></h2>
		<div class="mpblock mpprog">
			<ul id="list_curr">
				<!--?php wp_list_categories('hierarchical=0&title_li=&depth=1&exclude='.get_theme_mod('news_cat')); ?-->
				<?php wp_list_categories('hierarchical=0&title_li=&depth=1&child_of='.get_theme_mod('prog_cur_cat')); ?>
				<li class="nobullet"><a href="#show_old" onClick="listold();">а также архивные&hellip;</a></li>
			</ul>
			<ul id="list_old">
				<!--?php wp_list_categories('hierarchical=0&title_li=&depth=1&exclude='.get_theme_mod('news_cat')); ?-->
				<?php wp_list_categories('hierarchical=0&title_li=&depth=1&child_of='.get_theme_mod('prog_old_cat')); ?>
				<li class="nobullet"><a href="#show_current" onClick="listnew();">а также текущие&hellip;</a></li>
			</ul>
			<div class="clear"></div>
		</div>
	</div></div>
	
	<div class="shields">
		<a class="sh" href="http://kpi.ua/" style="background: url('<?php echo bloginfo('template_url'); ?>/img/shield-kpi.png');"></a>
		<a class="sh" href="http://dnvr.kpi.ua/" style="background: url('<?php echo bloginfo('template_url'); ?>/img/shield-dnvr.png');"></a>
		<a class="sh" href="http://student.kpi.ua/" style="background: url('<?php echo bloginfo('template_url'); ?>/img/shield-student.png');"></a>
		<a class="sh" href="http://gazeta.kpi.ua/" style="background: url('<?php echo bloginfo('template_url'); ?>/img/shield-gazeta.png');"></a>
		<a href="http://kitich.com/" class="kitich"></a>
		
		<?php echo get_theme_mod('counters'); ?>
	</div>