// jQuery core
window.jQuery = window.$ = require('./vendor/jquery.js');

// These all require jQuery
require('./vendor/prism.js');
require('./vendor/bootstrap.js');
require('./vendor/typeahead.js');
require('./vendor/scotchPanels.js');

// Standalone vendor libraries
const Hogan = require('./vendor/hogan.js');
const Mousetrap = require('./vendor/mousetrap.js');
const algoliasearch = require('./vendor/algoliasearch.js');

jQuery(function($) {
  // Smooth scroll to anchor
  $('body.home a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  var scotchPanel = $('#slide-menu').scotchPanel({
    containerSelector: 'body',
    direction: 'left',
    duration: 300,
    transition: 'ease',
    distanceX: '70%',
    forceMinHeight: true,
    minHeight: '2500px',
    enableEscapeKey: true
  }).show(); // show to avoid flash of content

  $('.toggle-slide').click(function() {
    scotchPanel.css('overflow', 'scroll');
    scotchPanel.toggle();
    return false;
  });

  $('.overlay').click(function() {
    // CLOSE ONLY
    scotchPanel.close();
  });

  // Hide the slide menu when changing the browser width

  function checkSize() {
    if (window.matchMedia("(min-width: 960px)").matches) {
      scotchPanel.close();
    }
  }

  checkSize();
  window.onresize = checkSize;

  $('.sidebar>ul').children().addClass('chapter');
  $('.sidebar>h1').hide();
  $('.chapter>a').addClass('chapterName');

  // gheading links
  $('.docs-wrapper').find('a[name]').each(function () {
    var anchor = $('<a href="#' + this.name + '"/>');
    $(this).parent().next('h2').wrapInner(anchor);
  });

  // It's nice to just write in Markdown, so this will adjust
  // our blockquote style to fill in the icon flag and label
  $('.docs blockquote p').each(function() {
    var str = $(this).html();
    var match = str.match(/\{(.*?)\}/);

    if (match) {
      var icon = match[1] || false;
      var word = match[1] || false;
    }

    if (icon) {
      switch (icon) {
        case "note":
          icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" x="0px" y="0px" width="90px" height="90px" viewBox="0 0 90 90" enable-background="new 0 0 90 90" xml:space="preserve"><path fill="#FFFFFF" d="M45 0C20.1 0 0 20.1 0 45s20.1 45 45 45 45-20.1 45-45S69.9 0 45 0zM45 74.5c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5S48.6 74.5 45 74.5zM52.1 23.9l-2.5 29.6c0 2.5-2.1 4.6-4.6 4.6 -2.5 0-4.6-2.1-4.6-4.6l-2.5-29.6c-0.1-0.4-0.1-0.7-0.1-1.1 0-4 3.2-7.2 7.2-7.2 4 0 7.2 3.2 7.2 7.2C52.2 23.1 52.2 23.5 52.1 23.9z"/></svg>';
          break;
        case "tip":
          icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" x="0px" y="0px" width="56.6px" height="87.5px" viewBox="0 0 56.6 87.5" enable-background="new 0 0 56.6 87.5" xml:space="preserve"><path fill="#FFFFFF" d="M28.7 64.5c-1.4 0-2.5-1.1-2.5-2.5v-5.7 -5V41c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v10.1 5 5.8C31.2 63.4 30.1 64.5 28.7 64.5zM26.4 0.1C11.9 1 0.3 13.1 0 27.7c-0.1 7.9 3 15.2 8.2 20.4 0.5 0.5 0.8 1 1 1.7l3.1 13.1c0.3 1.1 1.3 1.9 2.4 1.9 0.3 0 0.7-0.1 1.1-0.2 1.1-0.5 1.6-1.8 1.4-3l-2-8.4 -0.4-1.8c-0.7-2.9-2-5.7-4-8 -1-1.2-2-2.5-2.7-3.9C5.8 35.3 4.7 30.3 5.4 25 6.7 14.5 15.2 6.3 25.6 5.1c13.9-1.5 25.8 9.4 25.8 23 0 4.1-1.1 7.9-2.9 11.2 -0.8 1.4-1.7 2.7-2.7 3.9 -2 2.3-3.3 5-4 8L41.4 53l-2 8.4c-0.3 1.2 0.3 2.5 1.4 3 0.3 0.2 0.7 0.2 1.1 0.2 1.1 0 2.2-0.8 2.4-1.9l3.1-13.1c0.2-0.6 0.5-1.2 1-1.7 5-5.1 8.2-12.1 8.2-19.8C56.4 12 42.8-1 26.4 0.1zM43.7 69.6c0 0.5-0.1 0.9-0.3 1.3 -0.4 0.8-0.7 1.6-0.9 2.5 -0.7 3-2 8.6-2 8.6 -1.3 3.2-4.4 5.5-7.9 5.5h-4.1H28h-0.5 -3.6c-3.5 0-6.7-2.4-7.9-5.7l-0.1-0.4 -1.8-7.8c-0.4-1.1-0.8-2.1-1.2-3.1 -0.1-0.3-0.2-0.5-0.2-0.9 0.1-1.3 1.3-2.1 2.6-2.1H41C42.4 67.5 43.6 68.2 43.7 69.6zM37.7 72.5H26.9c-4.2 0-7.2 3.9-6.3 7.9 0.6 1.3 1.8 2.1 3.2 2.1h4.1 0.5 0.5 3.6c1.4 0 2.7-0.8 3.2-2.1L37.7 72.5z"/></svg>'
          break;
        case "laracasts":
        case "video":
          icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" version="1.1" x="0px" y="0px" width="68.9px" height="59.9px" viewBox="0 0 68.9 59.9" enable-background="new 0 0 68.9 59.9" xml:space="preserve"><path fill="#FFFFFF" d="M63.7 0H5.3C2.4 0 0 2.4 0 5.3v49.3c0 2.9 2.4 5.3 5.3 5.3h58.3c2.9 0 5.3-2.4 5.3-5.3V5.3C69 2.4 66.6 0 63.7 0zM5.3 4h58.3c0.7 0 1.3 0.6 1.3 1.3V48H4V5.3C4 4.6 4.6 4 5.3 4zM13 52v4h-2v-4H13zM17 52h2v4h-2V52zM23 52h2v4h-2V52zM29 52h2v4h-2V52zM35 52h2v4h-2V52zM41 52h2v4h-2V52zM4 54.7V52h3v4H5.3C4.6 56 4 55.4 4 54.7zM63.7 56H47v-4h18v2.7C65 55.4 64.4 56 63.7 56zM26 38.7c0.3 0.2 0.7 0.3 1 0.3 0.4 0 0.7-0.1 1-0.3l17-10c0.6-0.4 1-1 1-1.7s-0.4-1.4-1-1.7l-17-10c-0.6-0.4-1.4-0.4-2 0s-1 1-1 1.7v20C25 37.7 25.4 38.4 26 38.7zM29 20.5L40.1 27 29 33.5V20.5z"/></svg>';
          break;
      }

      $(this).html(str.replace(/\{(.*?)\}/, '<div class="flag"><span class="svg">'+ icon +'</span></div>'));
      $(this).parent().addClass('has-icon');
      $(this).addClass(word);
    }
  });

  Mousetrap.bind('/', function(e) {
    e.preventDefault();
    $('#search-input').focus();
  });

  Mousetrap.bind(["ctrl+b", "command+b"], function(e) {
    e.preventDefault();
    $(".sidebar").find( "h2" ).addClass('is-active');
  });

  initAlgoliaSearch();

  // Fixes FOUC for the search box
  $('.search.invisible').removeClass('invisible');

  function initAlgoliaSearch() {
    if (window.algolia_app_id === '') {
      return;
    }

    var client = algoliasearch(window.algolia_app_id, window.algolia_search_key);
    var index = client.initIndex('docs');

    var templates = {
      suggestion: Hogan.compile($('#search_suggestion_template').html()),
      empty: Hogan.compile($('#search_empty_template').html()),
      footer: Hogan.compile($('#search_footer_template').html())
    };

    var $searchInput = $('#search-input');
    var $mainNav = $('.main-nav');
    var $article = $('article');

    // Closes algolia results on blur
    $searchInput.blur(function () {
      $(this).val('');
    });

    // Hides main nav to widen algolia results
    $searchInput.on('input', function (event) {
      if (event.currentTarget.value !== '') {
        $mainNav.hide();
      } else {
        $mainNav.show();
      }
    });

    // typeahead datasets
    // https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#datasets
    var datasets = [];

    datasets.push({
      source: function searchAlgolia(query, cb) {
      index.search(query, {
        hitsPerPage: 5, tagFilters: [window.version]
      }, function searchCallback(err, content) {
          if (err) {
            throw err;
          }
          cb(content.hits)
        });
      },
      templates: {
        suggestion: templates.suggestion.render.bind(templates.suggestion),
        empty: templates.empty.render.bind(templates.empty),
        footer: templates.footer.render.bind(templates.footer)
      }
    });

    var typeahead = $searchInput.typeahead({hint: false}, datasets);
    var old_input = '';

    typeahead.on('typeahead:selected', function changePage(e, item) {
      window.location.href = '/' + item._tags[0] + '/' + item.link;
    });

    typeahead.on('keyup', function(e) {
      old_input = $(this).typeahead('val');

      if ($(this).val() === '' && old_input.length == $(this).typeahead('val')) {
        $article.css('opacity', '1');
        $searchInput.closest('#search-wrapper').removeClass('not-empty');
      } else {
        $article.css('opacity', '0.1');
        $searchInput.closest('#search-wrapper').addClass('not-empty');
      }
      if (e.keyCode === 27) {
        $article.css('opacity', '1');
      }
    });

    typeahead.on('typeahead:closed', function () {
      $article.css('opacity', '1');
    });

    typeahead.on('typeahead:closed',
        function (e) {
            // keep menu open if input element is still focused
            if ($(e.target).is(':focus')) {
                return false;
            }
        }
    );

    $('#cross').click(function() {
      typeahead.typeahead('val', '').keyup();
      $article.css('opacity', '1');
    });
  }

  // collapse and expand for the sidebar
  var toggles = document.querySelectorAll('.chapter'),
      togglesList = document.querySelectorAll('.sidebar h2 + ul');

  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', expandItem);
    toggles[i].addEventListener('keydown', expandItemKeyboard);
    toggles[i].setAttribute('tabindex', '0');
  }

  // Via https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
  function storageAvailable(type) {
    try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage.length !== 0;
    }
  }

  // Track the state of the doc collapse
  var docCollapsed = true;
  function expandDocs(e) {
    for (var i = 0; i < toggles.length; i++) {
      if(docCollapsed) {
        toggles[i].classList.add('is-active')
      } else {
        toggles[i].classList.remove('is-active')
      }
    }

    // Modify states
    docCollapsed = !docCollapsed;
    document.getElementById('doc-expand').text = (docCollapsed ? 'Expand All' : 'Collapse All');

    // Modify LS if we can
    if (storageAvailable('localStorage')) {
      localStorage.setItem('laravel_docCollapsed', docCollapsed);
    }
    // Cancel event
    if(e) {
      e.preventDefault();
    }
  }

  if (document.getElementById('doc-expand')) {
    // Load the users previous preference if available
    if(storageAvailable('localStorage')) {
      // Can't use if(var) since this is a boolean, LS returns null for unset keys
      if(localStorage.getItem('laravel_docCollapsed') === null) {
        localStorage.setItem('laravel_docCollapsed', true)
      } else {
        // Load previous state, and if it was false, then expand the doc
        // LS will store booleans as strings, we will "cast" them back here
        localStorage.getItem('laravel_docCollapsed') == 'false' ? expandDocs() : null
      }
    }

    // Register event listener
    document.getElementById('doc-expand').addEventListener('click', expandDocs);
  }

  if ($('.sidebar ul').length) {
    var current = $('.sidebar ul').find('li a[href="' + window.location.pathname + '"]');

    if (current.length) {
      current.parent().css('font-weight', 'bold');

      // Only toggle the state if the user has collapsed the documentation
      if(docCollapsed) {
        current.closest('ul').prev().toggleClass('is-active');
      }
    }
  }

  function expandItem(e) {
    var elem = e.target;

    if(elem.classList.contains('is-active')) {
      elem.classList.remove('is-active');
    } else {
      clearItems();
      elem.classList.add('is-active');
    }
  }

  function expandItemKeyboard(e) {
    var elem = e.target;

    if ([13, 37, 39].includes(e.keyCode)) {
      clearItems();
    }

    if (e.keyCode === 13) {
      elem.classList.toggle('is-active');
    }

    if (e.keyCode === 39) {
      elem.classList.add('is-active');
    }

    if (e.keyCode === 37) {
      elem.classList.remove('is-active');
    }
  }

  function clearItems() {
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].classList.remove('is-active');
    }
  }
});
