package com.gbsw.dormitory.Fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import com.gbsw.dormitory.R;

public class CommunityFragment extends Fragment {
    private FragmentManager fm;

    private LinearLayout communityAnnounce;
    private LinearLayout communityBoard;
    private LinearLayout communityLost;
    private LinearLayout communitySuggestion;
    private LinearLayout communityAnonymous;
    
    private Button btnWrite;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstanceState) {
        LinearLayout layout = (LinearLayout) inflater.inflate(R.layout.fragment_community, viewGroup, false);

        fm = getActivity().getSupportFragmentManager();

        communityAnnounce = layout.findViewById(R.id.community_announce);
        communityAnnounce.setOnClickListener(e -> {
            PostsFragment posts = new PostsFragment();
            Bundle bundle = new Bundle();
            bundle.putString("type", "공지");
            posts.setArguments(bundle);

            fm.beginTransaction().replace(R.id.layout_middle, posts)
                    .addToBackStack(null).commit();
        });

        communityBoard = layout.findViewById(R.id.community_board);
        communityBoard.setOnClickListener(e -> {
            PostsFragment posts = new PostsFragment();
            Bundle bundle = new Bundle();
            bundle.putString("type", "게시글");
            posts.setArguments(bundle);

            fm.beginTransaction().replace(R.id.layout_middle, posts)
                    .addToBackStack(null).commit();
        });

        communityLost = layout.findViewById(R.id.community_lost);
        communityLost.setOnClickListener(e -> {
            PostsFragment posts = new PostsFragment();
            Bundle bundle = new Bundle();
            bundle.putString("type", "분실물");
            posts.setArguments(bundle);

            fm.beginTransaction().replace(R.id.layout_middle, posts)
                    .addToBackStack(null).commit();
        });

        communitySuggestion = layout.findViewById(R.id.community_suggestion);
        communitySuggestion.setOnClickListener(e -> {
            PostsFragment posts = new PostsFragment();
            Bundle bundle = new Bundle();
            bundle.putString("type", "건의사항");
            posts.setArguments(bundle);

            fm.beginTransaction().replace(R.id.layout_middle, posts)
                    .addToBackStack(null).commit();
        });
        
        communityAnonymous = layout.findViewById(R.id.community_anonymous);
        communityAnonymous.setOnClickListener(e -> {
            PostsFragment posts = new PostsFragment();
            Bundle bundle = new Bundle();
            bundle.putString("type", "익명 게시판");
            posts.setArguments(bundle);

            fm.beginTransaction().replace(R.id.layout_middle, posts)
                    .addToBackStack(null).commit();
        });

        btnWrite = layout.findViewById(R.id.btn_write);
        btnWrite.setOnClickListener(e -> {
            // TODO

        });

        return layout;
    }

}
