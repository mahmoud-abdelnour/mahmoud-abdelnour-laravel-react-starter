<?php 
namespace App\Services; 


use DB;
use Auth;
use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Traits\ReturnData;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use App\Http\Resources\SettingResource;
use App\Repositories\SettingRepository;
use App\Http\Resources\SettingCollection;
use Illuminate\Support\Arr;
use App\Models\Setting;


class SettingsService {

    use ReturnData;

    function __construct(private SettingRepository $settingRepository) {
       
    }   

    function getSettings($request): array {
        try{  
          

            $settings = $this->settingRepository->all()->pluck('value', 'key')->toArray();
            
            $settings['logo'] = getLogoUrl();

            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $settings,
                [trans('common.get_settings')]
            );
        }catch(Exception $e){
            logger()->error('Can not get settings ', [
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);

            return $this->createReturnData(
                [trans('common.something_went_wrong')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                []
            );
        }    
    }

  
    function updateSettings($request){
        try {
            DB::enableQueryLog();
            $settingInputArray = Arr::only($request->toarray(), [
                'app_name', 'contact_email', 'logo',
            ]);
            $settingRepository =  $this->settingRepository->getModel();
            foreach($settingInputArray as $key=>$value){
                if($key == 'logo' && isset($value) && !empty($value)){
                    $setting = $settingRepository->where('key', '=', $key)->first();
                    if($setting){
                        //$setting->update(['value' => $fileName]);
                        $setting->clearMediaCollection(Setting::PATH);
                        $media = $setting->addMedia($request->logo)->toMediaCollection(Setting::PATH, config('app.media_disc'));
                        $setting = $setting->refresh();
                        $setting->update(['value' => $media->getFullUrl()]);
                    }   
                }else{
                    if (isset($value) && !empty($value)) {
                            $find = $settingRepository->where('key', '=', $key)->first();
                            if($find){
                                $find->update(['value' => $value]);   
                            }else{
                                
                            }
                    }
                }
            }


            $settings = $this->settingRepository->all()->pluck('value', 'key')->toArray();
            $settings['logo'] = getLogoUrl();
            DB::commit();

            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $settings,
                [trans('common.setting_update_success')]
            );
         
        } catch (Exception $e) {
            DB::rollBack();
            logger(
                [
                    'error' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ]
            );
            return $this->createReturnData(
                [trans('common.setting_update_fail')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                []
            );
        }
    }


}