@extends('app')

@section('content')
<nav id="slide-menu" class="slide-menu" role="navigation">

	<div class="brand">
		<a href="/">
			<img src="/assets/img/laravel-logo-white.png" height="50">
		</a>
	</div>

	<ul class="slide-main-nav">
		<li><a href="/">Home</a></li>
		@include('partials.main-nav')
	</ul>

	<div class="slide-docs-nav">
		<h2>Documentation</h2>

		<ul class="slide-docs-version">
			<li>
				<h2>Version</h2>

				<ul>
					<li>
						@if (isset($currentVersion))
							@include('partials.switcher')
						@endif
					</li>
				</ul>
			</li>
		</ul>

		{!! $index !!}
	</div>

</nav>

<div class="docs-wrapper container">

	<section class="sidebar">
		<script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CKYILK3E&placement=laravelcom" id="_carbonads_js"></script>
		<small><a href="#" id="doc-expand" style="font-size: 11px; color: #B8B8B8;">Expand All</a></small>
		{!! $index !!}
	</section>

	{{-- <div id="search">
		<div id="search-wrapper">
			<input placeholder="" type="text" id="search-input" />
			<i id="cross" class="icon"></i>
		</div>
	</div> --}}

	<article>
		{!! $content !!}
	</article>
</div>
@endsection