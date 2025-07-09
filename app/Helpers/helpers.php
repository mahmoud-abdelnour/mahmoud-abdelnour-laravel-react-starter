<?php

use App\Models\Setting;
use Illuminate\Support\Facades\File;

if (! function_exists('getPageSize')) {
    function getPageSize($request)
    {
        return $request->input('page.size', 10);
    }
}

if (! function_exists('getLogoUrl')) {
    function getLogoUrl(): string {
        static $appLogo;

        if (empty($appLogo)) {
            $appLogo = Setting::where('key', '=', 'logo')->first();
        }
        
        return asset($appLogo->logo);
    }
}

if (! function_exists('getSettingValue')) {
    function getSettingValue($keyName) {
        $key = 'setting'.'-'.$keyName;

        static $settingValues;

        if (isset($settingValues[$key])) {
            return $settingValues[$key];
        }

        /** @var Setting $setting */
        $setting = Setting::where('key', '=', $keyName)->first();
        $settingValues[$key] = $setting->value;

        return $setting->value;
    }
}

if (! function_exists('canDelete')) {
    function canDelete(array $models, string $columnName, int $id): bool {
        foreach ($models as $model) {
            $result = $model::where($columnName, $id)->exists();

            if ($result) {
                return true;
            }
        }

        return false;
    }
}

if (! function_exists('getLoginUserLanguage')) {
    function getLoginUserLanguage(): string {
        return \Illuminate\Support\Facades\Auth::user()->language;
    }

}

if (! function_exists('settingkeyExist')) {
    function settingkeyExist($key) {
        $exists = Setting::where('key', $key)->exists();

        return $exists;
    }
}


if (! function_exists('getLogo')) {
    function getLogo() {
        
        $logoImage = Setting::where('key', '=', 'logo')->first()->value;

        $logo = '';
        if (File::exists(asset($logoImage))) {
            $logo = base64_encode(file_get_contents(asset($logoImage)));
        }

        return 'data:image/png;base64,'.$logo;
    }
}

