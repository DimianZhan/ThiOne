<?php

namespace App;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Contracts\Cache\Repository as Cache;

class Documentation
{
    /**
     * The filesystem implementation.
     *
     * @var Filesystem
     */
    protected $files;

    /**
     * The cache implementation.
     *
     * @var Cache
     */
    protected $cache;

    /**
     * Create a new documentation instance.
     *
     * @param  Filesystem  $files
     * @param  Cache  $cache
     * @return void
     */
    public function __construct(Filesystem $files, Cache $cache)
    {
        $this->files = $files;
        $this->cache = $cache;
    }

    /**
     * Get the documentation index page.
     *
     * @param  string  $version
     * @return string
     */
    public function getIndex($version)
    {
        return $this->cache->remember('docs.'.$version.'.index', 5, function () use ($version) {
            $path = base_path('resources/docs/'.$version.'/SUMMARY.md');

            if ($this->files->exists($path)) {
                return $this->replaceLinks($version, markdown($this->files->get($path)));
            }

            return null;
        });
    }

    /**
     * Get the given documentation page.
     *
     * @param  string  $version
     * @param  string  $page
     * @return string
     */
    public function get($version, $category, $page)
    {
        return $this->cache->remember('docs.'.$version.'.'.$category.'.'.$page, 5, function () use ($version, $category, $page) {

            if (! empty($category)){
                $path = base_path('resources/docs/'.$version.'/'.$category.'/'.$page.'.md');
            }else{
                $path = base_path('resources/docs/'.$version.'/'.$page.'.md');
            }

            if ($this->files->exists($path)) {
                return $this->replaceLinks($version, markdown($this->files->get($path)));
            }

            return null;
        });
    }

    /**
     * Replace the version place-holder in links.
     *
     * @param  string  $version
     * @param  string  $content
     * @return string
     */
    public static function replaceLinks($version, $content)
    {
        return str_replace('{{version}}', $version, $content);
    }

    /**
     * Check if the given section exists.
     *
     * @param  string  $version
     * @param  string  $page
     * @return boolean
     */
    public function sectionExists($version, $page)
    {
        return $this->files->exists(
            base_path('resources/docs/'.$version.'/'.$page.'.md')
        );
    }

    /**
     * Get the publicly available versions of the documentation
     *
     * @return array
     */
    public static function getDocVersions()
    {
        return [
            'master' => 'Master',
            '1.8.2' => '1.8.2',
        ];
    }
}