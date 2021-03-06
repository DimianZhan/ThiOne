<?php

namespace App\Http\Controllers;

use App\Documentation;
use Symfony\Component\DomCrawler\Crawler;

class DocsController extends Controller
{
    /**
     * The documentation repository.
     *
     * @var Documentation
     */
    protected $docs;

    /**
     * Create a new controller instance.
     *
     * @param  Documentation  $docs
     * @return void
     */
    public function __construct(Documentation $docs)
    {
        $this->docs = $docs;
    }

    /**
     * Show the root documentation page (/docs).
     *
     * @return Response
     */
    public function showRootPage()
    {
        return redirect('/'.DEFAULT_VERSION);
    }

    /**
     * Show a documentation page.
     *
     * @param  string $version
     * @param  string|null $page
     * @return Response
     */
    public function show($pageuri = null)
    {
        $pageuri = explode('/', $pageuri);
        $page = array_pop($pageuri);
        $version = array_shift($pageuri);
        $category = null;

        if ( count($pageuri) != 0 ) {
            $category = implode('/', $pageuri);
        }

        if (! $this->isVersion($version)) {
            return redirect('/'.DEFAULT_VERSION.'/'.$version, 301);
        }

        if (! defined('CURRENT_VERSION')) {
            define('CURRENT_VERSION', $version);
        }

        $sectionPage = $page ?: 'README';
        $content = $this->docs->get($version, $category, $sectionPage);

        if (is_null($content)) {
            return response()->view('docs', [
                'title' => 'Page not found',
                'index' => $this->docs->getIndex($version),
                'content' => view('partials.doc-missing'),
                'currentVersion' => $version,
                'versions' => Documentation::getDocVersions(),
                'currentSection' => '',
                'canonical' => null,
            ], 404);
        }

        $title = (new Crawler($content))->filterXPath('//h1');

        $section = '';

        // if ($this->docs->sectionExists($version, $page)) {
        //     $section .= '/'.$page;
        // } elseif (! is_null($page)) {
        //     return redirect('/'.$version);
        // }

        $section .= '/'.$page;

        //$canonical = null;

        //if ($this->docs->sectionExists(DEFAULT_VERSION, $sectionPage)) {
        //    $canonical = '/'.DEFAULT_VERSION.'/'.$sectionPage;
        //}

        return view('docs', [
            'title' => count($title) ? $title->text() : null,
            'index' => $this->docs->getIndex($version),
            'content' => $content,
            'currentVersion' => $version,
            'versions' => Documentation::getDocVersions(),
            'currentSection' => $section,
            //'canonical' => $canonical,
        ]);
    }

    /**
     * Determine if the given URL segment is a valid version.
     *
     * @param  string  $version
     * @return bool
     */
    protected function isVersion($version)
    {
        return array_key_exists($version, Documentation::getDocVersions());
    }
}