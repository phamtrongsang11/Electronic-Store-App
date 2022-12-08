<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return response(['status' => 422, 'errors' => $validator->errors()->all()]);
        }

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 401,
                'errors' => "Unauthorized",
            ]);
        }

        $user = Auth::user();

        if ($user->is_locked == 1) {
            return response(['status' => 404, 'message' => "This user had been locked for some reason!!!"]);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fname' => 'required|String|max:255',
            'lname' => 'required|String|max:255',
            'phone' => 'required|String|max:12',
            'email' => 'required|String|email|max:255|unique:users',
            'password' => 'required|String|min:3',

        ]);

        if ($validator->fails()) {
            return response(['status' => 422, 'errors' => $validator->errors()->all()]);
        }

        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function me()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
        ]);
    }

    public function refresh()
    {
        $token = Auth::refresh();
        return $this->respondWithToken($token);
    }

    public function respondWithToken($token)
    {
        return response()->json([
            'status' => '200',
            'message' => 'success',
            'user' => Auth::user(),
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
                'expires_in' => Auth::factory()->getTTL() * 360000,
            ]
        ]);
    }

    public function updateProfile(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['status' => 404, 'message' => 'User not found']);
        }
        $user->image = $request->input('image');
        $user->fname = $request->input('fname');
        $user->lname = $request->input('lname');
        $user->phone = $request->input('phone');
        $user->address = $request->input('address');
        $user->update();
        $token = Auth::refresh();

        return response()->json([
            'status' => '200',
            'message' => 'success',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
                'expires_in' => Auth::factory()->getTTL() * 360000,
            ]
        ]);
    }

    public function getCustomers()
    {

        $users = User::where('role_id', '=', 1)->get();

        if (!$users) {
            return response()->json(['status' => 404, 'message' => 'Customers not found']);
        }

        $users->load('role');

        return response()->json([
            'status' => 200,
            'customers' => $users,
        ]);
    }


    public function changePassword(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|String|email|max:255|unique:users',
            'password' => 'required|String|min:3',
        ]);

        $password_cur = $request->input('password_cur');
        $password_new = $request->input('password_new');

        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($password_cur, $user->password)) {
                $user->password = Hash::make($password_new);
                $user->save();
                return response()->json(['status' => 200, 'message' => 'Password change success']);
            } else {
                return response()->json(['status' => 404, 'message' => 'Passwrod not match']);
            }
        } else {
            return response()->json(['status' => 404, 'message' => 'Email not found']);
        }
    }

    public function getEmployees()
    {
        $emps = User::where('role_id', '!=', 1)->get();

        if (!$emps) {
            return response()->json(['status' => 404, 'message' => 'Employees not found']);
        }

        $emps->load('role');

        return response()->json([
            'status' => 200,
            'emps' => $emps,
        ]);
    }


    public function updateLocked(Request $request, $id)
    {

        $user = User::find($id);
        if (!$user) {
            return response()->json(['status' => 404, 'message' => 'User not found']);
        }

        $user->is_locked = $request->input('is_locked');

        $user->update();
        $user->load('role');

        return response()->json(['status' => 200, 'message' => 'Updated successfully', 'user' => $user]);
    }

    public function showEmployee($id)
    {
        $emp = User::find($id);
        if (!$emp)

            return response()->json(['status' => 404, 'message' => 'Emp not found']);
        $emp->load('role');
        return response()->json(['status' => 200, 'employee' => $emp]);
    }

    public function createEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fname' => 'required|String|max:255',
            'lname' => 'required|String|max:255',
            'phone' => 'required|String|max:12',
            'email' => 'required|String|email|max:255|unique:users',
            'password' => 'required|String|min:3',
        ]);

        if ($validator->fails()) {
            return response(['status' => 422, 'errors' => $validator->errors()->all()]);
        }

        $user = User::create([
            'image' => $request->image,
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'address' => $request->address,
        ]);

        return response()->json(['status' => 200, 'message' => 'Employee created success']);
    }

    public function updateEmployee(Request $request, $id)
    {
        $emp = User::find($id);
        if (!$emp)
            return response()->json(['status' => 404, 'message' => 'Emp not found']);

        $validator = Validator::make($request->all(), [
            'fname' => 'required|String|max:255',
            'lname' => 'required|String|max:255',
            'phone' => 'required|String|max:12',
            'email' => 'required|String|email|max:255|unique:users',
            'password' => 'required|String|min:3',
        ]);

        if ($validator->fails()) {
            return response(['status' => 422, 'errors' => $validator->errors()->all()]);
        }

        $emp->image = $request->input('image');
        $emp->fname = $request->input('fname');
        $emp->lname = $request->input('lname');
        $emp->lname = $request->input('email');
        $emp->lname = $request->input('phone');
        $emp->password = Hash::make($request->input('password'));
        $emp->address = $request->input('address');

        $emp->update();

        return response()->json(['status' => 200, 'message' => 'Employee update success']);
    }
}
